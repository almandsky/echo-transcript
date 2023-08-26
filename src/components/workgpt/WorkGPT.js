import React, { useState, useEffect, useRef } from "react";
import { Prompt } from 'react-router-dom';
import PropTypes from "prop-types";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// icons
import DoneIcon from '@mui/icons-material/Done';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

// internal imports
import LanguageSelect from '../common/LanguageSelect';
import workTemplates from './workTemplates';
import { generateChat, intentDetection, progressTracker, reportIntendSummary } from '../common/systemWorkers';
import BarChart from '../charts/BarChart';

import { genChartData, typeMessage, truncateText } from '../common/utils';
import { extractParameters, paramsToSoql } from '../common/messageToActions';

import { HOME_FLOW, SALES_FLOW, SERVICES_FLOW } from '../common/constants';

const HUMAN_PREFIX = 'Human:';

const MAX_HISTORY = 1000;

function WorkGPT(props) {

    // block | none
    const debug = false;
    const testManualInput = false;

    const [state, setState] = useState({
        language: 'en-US',
        noiseCanceling: true,
        autoGainControl: true
    });

    const {
        language,
        noiseCanceling,
        autoGainControl,
    } = state;

    const [playing, setPlaying] = useState(false);
    const [localStream, setStream] = useState(null);
    const [speechRecognition, setRecognition] = useState(null);
    const [synth, setSynth] = useState(null);
    const [thinking, setThinking] = useState(false);
    const [answering, setAnswering] = useState(false);
    const [wakeLock, setWakeLock] = useState(null);
    const [wakeLockSupported, setWakeLockSupported] = useState(null);
    const [model, setModel] = useState('text-davinci-003');

    const [selectedTemplate, setSelectedTemplate] = useState(HOME_FLOW);
    const [currentWorkContext, setCurrentWorkContext] = useState('');
    const [soqlQuery, setSoqlQuery] = useState(``);

    const [chartData, setChartData] = useState(null);
    const [testMessage, setTestMessage] = useState('Show me revenue since beginning of 2022 by month');

    const [chatHistory, setChatHistory] = useState([]);
    const [chatHistoryMap, setChatHistoryMap] = useState({});
    const [caseStatus, setCaseStatus] = useState('');

    const textFieldRef = useRef(null);

    useEffect(() => {
        if (textFieldRef && textFieldRef.current) {
            textFieldRef.current.scrollTop = textFieldRef.current.scrollHeight;
        }
    }, [textFieldRef.current?.value]);

    const processAnswer = async () => {
        // const supportedVoices = window.speechSynthesis.getVoices();
        const transcriptDiv = document.querySelector('#transcript-div');
        const answerDiv = document.querySelector('#answer-div');
        const textToRead = transcriptDiv.innerHTML;

        if (!textToRead) {
            return;
        }

        setAnswering(true);

        // detect intent

        // load the context

        // load the history of that context

        // send the request with the intended context

        // call the actions of the context

        // set the history to that context

       

        // detect the intent
        const newChatHistory = chatHistory;

        const overallWorkContext = workTemplates[HOME_FLOW].workContext;
        const intentText = await intentDetection({
            auth: props.auth,
            model,
            currentWorkContext: overallWorkContext,
            newPrompt: newChatHistory?.join('\n') + HUMAN_PREFIX + textToRead
        })

        let newTemplate = selectedTemplate;



        if (intentText.indexOf('workflow=') >= 0) {
            const newWorkflow = intentText.slice(intentText.indexOf('=') + 1).trim().replaceAll(`\``, '');

            if (newWorkflow && newWorkflow !== selectedTemplate && workTemplates[newWorkflow]) {
                newTemplate = newWorkflow;
                const switchContextMessage = `\n\n Switch context to ${newWorkflow}\n\n`;
                newChatHistory.push(switchContextMessage);
                // speakMessage(switchContextMessage, true);
            }
        }

        const newChatHistoryMap = chatHistoryMap;

        // const newPromptArray = chatHistory;
        if (!newChatHistoryMap[newTemplate]) {
            // Init the chat history for the template
            newChatHistoryMap[newTemplate] = [];
        }
        const newPromptArray = newChatHistoryMap[newTemplate];

        newPromptArray.push(HUMAN_PREFIX + textToRead);
        newChatHistory.push(HUMAN_PREFIX + textToRead);

        const newPrompt = newPromptArray.length > MAX_HISTORY
            ? newPromptArray.slice(-MAX_HISTORY).join('\n')
            : newPromptArray.join('\n');

        window?.gtag('event', 'call_openai_start', {
            'event_category': language,
            'event_label': 'Making API call to openAI',
            'value': newPrompt.length
        });

        const newWorkContext = workTemplates[newTemplate].workContext;

        const temperature = newTemplate === HOME_FLOW
            ? 0.5
            : 0.1

        const answerText = await generateChat({
            auth: props.auth,
            model,
            currentWorkContext: newWorkContext,
            newPrompt,
            temperature
        });

        // store the chat history from Human and AI
        newPromptArray.push(answerText);
        newChatHistory.push(HUMAN_PREFIX + textToRead);


        window?.gtag('event', 'call_openai_completed', {
            'event_category': language,
            'event_label': 'Received API response from openAI',
            'value': answerText.length
        });

        // now handle the answerText based on the current work flow

        let textToDisplay = '';

        if (newTemplate === SALES_FLOW) {
            const { rawParams } = extractParameters(answerText);

            if (rawParams) {
                const soqlQueryOutput = paramsToSoql(rawParams);
    
                if (soqlQueryOutput) {
                    try {
                        const { queryText, metric } = soqlQueryOutput
                        const chartGeneratedData = await genChart(queryText, metric);
    
                        setSoqlQuery(queryText);

                        if (chartGeneratedData) {
                            const reportIntentText = await reportIntendSummary({
                                auth: props.auth,
                                model,
                                currentWorkContext: newWorkContext,
                                reportData: chartGeneratedData,
                                newPrompt,
                                temperature
                            });

                            const reportTitle = reportIntentText;
                            textToDisplay = reportTitle
                                ? `${reportTitle}`
                                : '';
                        } else {
                            textToDisplay = 'No data found';
                        }
                    } catch (err) {
                        console.error(`Error during chart generation: ${err.message}`);
                        textToDisplay = 'Failed to generate report';
                    }
                } else {
                    // no valid SOQL generated.
                    textToDisplay = 'Cannot generate report, Please provide better instruction.';
                }
            } else {
                // no parameter found, then clarify with the users
                textToDisplay = truncateText(answerText);
            }
        } else if (newTemplate === SERVICES_FLOW) {
            // keep track of the current state of the case progress.
            // update the new case status
            
            const caseStatusResponse = await progressTracker({
                auth: props.auth,
                model,
                currentWorkContext: newWorkContext,
                newPrompt: newPromptArray?.join('\n') + HUMAN_PREFIX + textToRead
            })

            setCaseStatus(caseStatusResponse);

            newPromptArray.push(caseStatusResponse)

            textToDisplay = truncateText(answerText);
        } else {
            // generic Q & A
            textToDisplay = truncateText(answerText);
        }

        // type and speak the response
        setAnswering(false);
        typeMessage(answerDiv, textToDisplay, async () => {
            answerDiv.scrollTop = answerDiv.scrollHeight;
            setChatHistory(newPromptArray);
        });

        speakMessage(textToDisplay, true);

        
        newChatHistoryMap[newTemplate] = newPromptArray;
        setChatHistoryMap(newChatHistoryMap);
        transcriptDiv.innerHTML = '';
        setSelectedTemplate(newTemplate);
    };

    const handleOnclickTest = () => {
        const answerDiv = document.querySelector('#answer-div');
        speakMessage(answerDiv.innerHTML, false);
    };

    const speakMessage = (textToDisplay, pause = false) => {
        const supportedVoices = window.speechSynthesis.getVoices();
        const utterance = new SpeechSynthesisUtterance(textToDisplay);
        if (language !== 'en-US') {
            utterance.voice = supportedVoices.find((voice) => voice.lang === language);
        }

        utterance.lang = language;
        utterance.rate = 0.9;

        utterance.onstart = () => {
            console.log('Speech started, pause is ', pause);
            if (pause) {
                speechRecognition.stop();
            }

        };

        utterance.onend = () => {
            console.log('Speech ended, pause is ', pause);
            if (pause) {
                speechRecognition.start();
            }
        };
        synth.speak(utterance);
    }

    const startProcess = async () => {
        window?.gtag('event', 'startwork', {
            'event_category': language,
            'event_label': 'Start Work with chatGPT'
        });
        if (window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia) {
            let hasHeadphone = false;
            navigator.mediaDevices.enumerateDevices()
                .then((devices) => {
                    devices.forEach((device) => {
                        if (device.kind === 'audiooutput' && device.label && device.label.toLowerCase().includes('headphone')) {
                            console.log('Headphone detected!');
                            hasHeadphone = true;
                        }
                    });
                })
                .catch((err) => {
                    console.error(`${err.name}: ${err.message}`);
                });
            window.navigator.mediaDevices.getUserMedia({
                audio: {
                    noiseSuppression: noiseCanceling,
                    autoGainControl: autoGainControl,
                    echoCancellation: !hasHeadphone,
                    sampleRate: 192000,
                    sampleSize: 24
                },
            }).then(stream => {
                setStream(stream);
                if (speechRecognition) {
                    speechRecognition.mediaStream = stream;
                }
                // playWithDelay(stream);
            })
                .catch(error => {
                    console.error(error);
                });
        }

        if (speechRecognition) {
            speechRecognition.onresult = (event) => {
                const transcriptDiv = document.querySelector('#transcript-div');
                const answerDiv = document.querySelector('#answer-div');
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const result = event.results[i];
                    if (result.isFinal) {
                        let message = result[0].transcript.trim();

                        if (message.toLowerCase() === 'break' || message.toLowerCase() === 'line break' || message.toLowerCase() === 'next line') {
                            message = '\n';
                        } else if (message.toLowerCase() === 'stop') {
                            message = '';
                            setPlaying(false);
                        } else if (message.toLowerCase() === 'reset') {
                            message = '';
                            transcriptDiv.innerHTML = '';
                        } else {
                            message += '. ';
                        }

                        setThinking(false);
                        const historyMessage = HUMAN_PREFIX + '\n\n' + message;
                        setChatHistory([
                            ...chatHistory,
                            historyMessage
                        ])
                        typeMessage(transcriptDiv, message, async () => {
                            transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
                            answerDiv.innerHTML = '';
                            await processAnswer();
                        });
                    } else {
                        setThinking(true);
                    }
                }
            };
            speechRecognition.start();

            speechRecognition.onerror = (event) => {
                console.log(`Speech recognition error detected: ${event.error}`);
                console.log(`Additional information: ${event.message}`);
                console.log(`event information: ${JSON.stringify(event)}`);
                // try to restart
                if (event.error === 'network') {
                    speechRecognition.stop();
                    speechRecognition.start();
                }
            }

            // log other events

            speechRecognition.onaudiostart = (event) => {
                console.log(`onaudiostart: ${JSON.stringify(event)}`);
            }

            speechRecognition.onaudioend = (event) => {
                console.log(`onaudioend: ${JSON.stringify(event)}`);
            }

            speechRecognition.onend = (event) => {
                console.log(`onend: ${JSON.stringify(event)}`);
                if (playing && !synth.speaking) {
                    speechRecognition.stop();
                    speechRecognition.start();
                }
            }

            speechRecognition.onnomatch = (event) => {
                console.log(`onnomatch: ${JSON.stringify(event)}`);
            }

            speechRecognition.onsoundstart = (event) => {
                console.log(`onsoundstart: ${JSON.stringify(event)}`);
            }

            speechRecognition.onsoundend = (event) => {
                console.log(`onsoundend: ${JSON.stringify(event)}`);
            }

            speechRecognition.onspeechstart = (event) => {
                console.log(`onspeechstart: ${JSON.stringify(event)}`);
            }

            speechRecognition.onspeechend = (event) => {
                console.log(`onspeechend: ${JSON.stringify(event)}`);
            }

            speechRecognition.onstart = (event) => {
                console.log(`onstart: ${JSON.stringify(event)}`);
            }

            if (wakeLockSupported) {
                // Listen for wake lock release
                try {
                    // Request a screen wake lock
                    let tempWakeLock = await window.navigator.wakeLock.request();
                    console.log('Wake Lock is active!');
                    tempWakeLock.addEventListener('release', () => {
                        console.log(`Screen Wake Lock released: ${tempWakeLock.released}`);
                    });

                    setWakeLock(tempWakeLock);
                } catch (err) {
                    // The Wake Lock request has failed - usually system related, such as battery.
                    console.log(`${err.name}, ${err.message}`);
                }
            }
        }
    };

    const stopProcess = () => {
        window?.gtag('event', 'stopwork', {
            'event_category': language,
            'event_label': 'Stop Work with chatGPT'
        });
        if (speechRecognition) {
            speechRecognition.onend = null;
            speechRecognition.stop();
        }

        if (synth) {
            synth.cancel()
        }

        localStream && localStream.getAudioTracks().forEach((audioTrack) => {
            if (audioTrack) {
                audioTrack.stop();
            }
        });


        if (wakeLockSupported && wakeLock) {
            wakeLock.release()
                .then(() => {
                    console.log('Wake Lock is released!');
                });
        }

        setThinking(false);
    };

    // componentDidMount
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const synthesis = window.speechSynthesis;

        let recognition;
        let tempWakeLockSupported;
        if (SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.interimResults = true;
            recognition.continuous = true;
            recognition.lang = language;
        }

        if ('wakeLock' in window.navigator) {
            tempWakeLockSupported = true;
            console.log('Screen Wake Lock API supported!')
        } else {
            console.log('Wake lock is not supported by this browser.')
        }

        setRecognition(recognition);
        setSynth(synthesis);
        setWakeLockSupported(tempWakeLockSupported);

        updateTemplateRelatedInfo(selectedTemplate);
        // based on is playing or not, either start the audio or stop.
    }, []);

    useEffect(() => {
        if (speechRecognition) {
            speechRecognition.lang = language;
        }
    }, [language]);

    // playing status changed
    useEffect(async () => {
        // based on is playing or not, either start the audio or stop.
        if (playing) {
            // speakMessage('Let\'s start!');
            await startProcess();
        } else {
            stopProcess(true);
        }
    }, [playing]);


    const handleStartClick = async () => {
        setPlaying(true);
    };

    const handleStopClick = () => {
        setPlaying(false);
        if (speechRecognition) {
            speechRecognition.stop();
        }
    };

    // const handleResetClick = () => {
    //     const transcriptDiv = document.querySelector('#transcript-div');
    //     const answerDiv = document.querySelector('#answer-div');
    //     transcriptDiv.innerHTML = '';
    //     answerDiv.innerHTML = '';
    //     setChatHistory([]);
    //     updateTemplateRelatedInfo(selectedTemplate);
    // };

    const handleLanguageChange = (event, newValue) => {
        setState({
            ...state,
            language: newValue.props.value
        });
    };

    const handleModelChange = (event, newValue) => {
        setModel(newValue.props.value);
    };

    const updateTemplateRelatedInfo = (templateName) => {
        const template = workTemplates[templateName];
        if (!template) {
            return;
        }
        const { workContext } = template;

        setCurrentWorkContext(workContext);
    }

    // const handleTemplateChange = (event, newValue) => {
    //     setSelectedTemplate(newValue.props.value);

    //     // update the actions list and context as well.
    //     updateTemplateRelatedInfo(newValue.props.value);
    // };

    const handleWorkContextChange = (event) => {
        setCurrentWorkContext(event.target.value);
    };


    const handleNoiseCancelingChange = (event, newValue) => {
        setState({
            ...state,
            noiseCanceling: newValue
        });
    };

    const handleAutoGainChange = (event, newValue) => {
        setState({
            ...state,
            autoGainControl: newValue
        });
    };

    const handleQueryChange = (event) => {
        setSoqlQuery(event.target.value);
    };

    const handleTestMessageChange = (event) => {
        setTestMessage(event.target.value);
    };

    const genChart = async (soqlQuery, metric) => {
        setChartData(null);

        const data = await genChartData(soqlQuery, metric);

        if (data) {
            setChartData(data);
            return data;
        }

        return null;
    }

    const handleQueryClick = async () => {
        setSelectedTemplate(SALES_FLOW);
        await genChart(soqlQuery, 'revenue');
    };

    const handleRestRequestClick = async () => {
        const transcriptDiv = document.querySelector('#transcript-div');
        const answerDiv = document.querySelector('#answer-div');
        answerDiv.innerHTML = '';
        transcriptDiv.innerHTML = testMessage;
        await processAnswer();

        if (speechRecognition) {
            speechRecognition.stop();
        }
    }

    return (
        <Container component="main" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'grid', gap: 2 }} id="controls">
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 1
                        }} align="center">
                            <Button variant="contained" disabled={playing} onClick={handleStartClick} endIcon={<MicIcon />}>Activate</Button>
                            <Button variant="contained" disabled={!playing} onClick={handleStopClick} endIcon={<MicOffIcon />}>Deactivate</Button>
                            {/* <Button variant="contained" disabled={playing} onClick={handleResetClick}>Reset</Button> */}
                        </Box>
                        <Box align="center">
                            <FormControl component="fieldset" variant="standard" align='left'>
                                { debug && <FormControl variant="standard">
                                    <LanguageSelect
                                        onChange={handleLanguageChange}
                                        disabled={playing}
                                        value={language}
                                    />
                                </FormControl>}
                                { debug && <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={noiseCanceling} onChange={handleNoiseCancelingChange} id="noise-canceling-checkbox" name="noise-canceling" />
                                        }
                                        label="Noise Suppression"
                                        disabled={playing}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={autoGainControl} onChange={handleAutoGainChange} id="auto-gain-checkbox" name="auto-gain" />
                                        }
                                        label="Auto Gain Control"
                                        disabled={playing}
                                    />
                                </FormGroup>}
                                { debug && <FormControl variant="standard" sx={{ mb: 1 }}>
                                    <InputLabel id="model-select-label" variant="standard">Model</InputLabel>
                                    <Select
                                        labelId="model-select-label"
                                        id="model-select"
                                        label="Model"
                                        onChange={handleModelChange}
                                        disabled={playing}
                                        value={model}
                                    >
                                        <MenuItem value="text-ada-001">text-ada-001</MenuItem>
                                        <MenuItem value="text-babbage-001">text-babbage-001</MenuItem>
                                        <MenuItem value="text-curie-001">text-curie-001</MenuItem>
                                        <MenuItem value="text-davinci-003">text-davinci-003</MenuItem>
                                    </Select>
                                </FormControl>}
                                <FormControl variant="standard" align='center'>
                                    <Typography variant="caption">Current Context</Typography>    
                                    <Stack direction="row" spacing={1}>
                                        {
                                            Object.keys(workTemplates).map(((workTemplateKey) => {
                                                return (
                                                    <Chip
                                                        key={workTemplateKey}
                                                        label={workTemplateKey}
                                                        color={workTemplateKey === selectedTemplate ? 'primary' : 'default'}
                                                        deleteIcon={workTemplateKey === selectedTemplate ? <DoneIcon /> : null}
                                                    />
                                                )
                                            }))
                                        }
                                    </Stack>

                                    {/* <InputLabel id="template-select-label" variant="standard">Current Context</InputLabel>
                                    <Select
                                        labelId="template-select-label"
                                        id="template-select"
                                        label="Current Context"
                                        onChange={handleTemplateChange}
                                        value={selectedTemplate}
                                    >
                                        {
                                            Object.keys(workTemplates).map(((workTemplateKey) => {
                                                return (
                                                    <MenuItem key={workTemplateKey} value={workTemplateKey}>{workTemplateKey}</MenuItem>
                                                )
                                            }))
                                        }
                                    </Select> */}
                                </FormControl>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={12}>
                        {
                            selectedTemplate === SALES_FLOW && chartData && chartData.data && <BarChart chartData={chartData} />
                        }
                        {
                            selectedTemplate === SERVICES_FLOW && (
                                <>
                                    {/* <Stepper activeStep={0} alternativeLabel>
                                        <Step>
                                            <StepLabel>Running</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Swimming</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Push-Ups</StepLabel>
                                        </Step>
                                    </Stepper> */}
                                    <Typography variant="caption"><pre>{caseStatus}</pre></Typography>
                                </>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="caption">You said:</Typography>
                        <Card raised sx={{ p: 2 }}><pre id="transcript-div" className={thinking ? 'thinking work' : 'work'}></pre></Card>
                    </Grid>
                    <Grid item xs={12} sm={6} className="work">
                        <Typography variant="caption">chatGPT said:</Typography>
                        <Card raised sx={{ p: 2, bgcolor: '#defcfc' }}><pre id="answer-div" className={answering ? 'thinking work' : 'work'}></pre></Card>
                    </Grid>
                    { (debug || testManualInput) && <Grid item xs={12} sm={12}>
                        <TextField
                            id="test-message-input"
                            label="Test Message"
                            variant="outlined"
                            multiline
                            sx={{ width: '100%' }}
                            rows={2}
                            value={testMessage}
                            onChange={handleTestMessageChange}
                        />
                        <Button onClick={handleRestRequestClick}>Test request</Button>
                    </Grid>}
                    <Grid item xs={12} sm={12}>
                        <TextField
                            id="soql-input"
                            label="SOQL Query"
                            variant="outlined"
                            multiline
                            sx={{ width: '100%' }}
                            rows={4}
                            value={soqlQuery}
                            onChange={handleQueryChange}
                        />
                        { (debug || testManualInput) && <Button onClick={handleQueryClick}>Gen Report</Button>}
                    </Grid>
                    { debug && <Grid item xs={12} sm={12}>
                        <TextField
                            id="context-input"
                            label="Work Context"
                            variant="outlined"
                            multiline
                            sx={{ width: '100%' }}
                            rows={4}
                            value={currentWorkContext}
                            onChange={handleWorkContextChange}
                        />
                    </Grid>}
                    { debug && <Grid item xs={12} sm={12}>
                        <TextField
                            id="text-input"
                            label="Chat History"
                            variant="outlined"
                            multiline
                            sx={{ width: '100%' }}
                            rows={4}
                            value={chatHistory.join('\n')}
                            inputRef={debug ? textFieldRef : null}
                        />
                        <Button onClick={handleOnclickTest}>Repeat the chatGPT answer</Button>
                    </Grid> }
                </Grid>
                <Prompt
                    when={playing}
                    // message="Are you sure you want to leave this page? Your microphone is still being used."
                    message={(location) => {
                        if (location.pathname === '/talkgpt') {
                            return true;
                        }
                        stopProcess();
                        return ('The Talk to chatGPT is stop when you navigate to other page.');
                    }}
                />
            </Paper>
        </Container>
    );
}

WorkGPT.propTypes = {
    auth: PropTypes.object.isRequired
};

export default WorkGPT;
