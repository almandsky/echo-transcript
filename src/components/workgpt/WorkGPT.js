import React, { useState, useEffect, useRef } from "react";
import { Prompt } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';


import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import LanguageSelect from '../common/LanguageSelect';
import workTemplates from './workTemplates';
import { intentDetection } from './systemWorkers';
import BarChart from '../charts/BarChart';

const HUMAN_PREFIX = 'Human:';
const AI_PREFIX = 'AI:';

const AI_ENDPOINT = '/completions';

const MAX_HISTORY = 1000;

function WorkGPT() {

    // block | none
    const debug = false;
    const devDisplay = debug ? 'block' : 'none';

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

    const [selectedTemplate, setSelectedTemplate] = useState('Overall Workflow');
    const [currentWorkContext, setCurrentWorkContext] = useState('');
    const [currentActions, setCurrentActions] = useState([]);
    const [suggestedAction, setSuggestedAction] = useState(null);
    const [soqlQuery, setSoqlQuery] = useState(``);

    const [chartData, setChartData] = useState(null);



    const [chatHistory, setChatHistory] = useState([]);
    const [chatHistoryMap, setChatHistoryMap] = useState({});

    const textFieldRef = useRef(null);

    useEffect(() => {
        textFieldRef.current.scrollTop = textFieldRef.current.scrollHeight;
    }, [textFieldRef.current?.value]);

    // let template = '';


    const truncateText = (inputText) => {
        if (!inputText) {
            return inputText;
        }

        let truncatedText = '';
        let posComma = inputText.indexOf(':');
        let posCommaNonASCII = inputText.indexOf('：');

        if (posComma >= 0 && posComma <= 10) {
            truncatedText = inputText.slice(posComma + 1);
        } else if (posCommaNonASCII >= 0 && posCommaNonASCII <= 10) {
            truncatedText = inputText.slice(posCommaNonASCII + 1);
        } else {
            truncatedText = inputText;
        }

        return truncatedText;
    }

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

        // speak the response

        // detect the intent
        const newChatHistory = chatHistory;

        const overallWorkContext = workTemplates['Overall Workflow'].workContext;
        const intentText = await intentDetection({
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
                // speakMessage(switchContextMessage)
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

        // if it is workout context, add the current state to the prompt

        const temperature = newTemplate === 'Overall Workflow'
            ? 0.5
            : 0.1

        const response = await axios.post(AI_ENDPOINT, {
            "model": model,
            "prompt": newWorkContext + '\n\n' + newPrompt,
            "temperature": temperature,
            "max_tokens": 500,
            "top_p": 1,
            "frequency_penalty": 0.2,
            "presence_penalty": 0.2,
            "stop": [`${HUMAN_PREFIX}`, `${AI_PREFIX}`]
        });

        const answerText = response.data;

        newPromptArray.push(answerText);
        newChatHistory.push(HUMAN_PREFIX + textToRead);


        window?.gtag('event', 'call_openai_completed', {
            'event_category': language,
            'event_label': 'Received API response from openAI',
            'value': answerText.length
        });

        // now handle the answerText based on the current work flow

        let textToDisplay = '';

        if (newTemplate === 'Analytics Workflow') {
            // parse the parameter

            // ` show(metric, group_by, customer, location, start_date)`
            const regex = /show\((.*)\)/;
            const match = answerText.match(regex);

            const queryObject = {};

            if (match) {
                const rawParams = match[1];

                const params = rawParams.split(',');

                if (params[0].indexOf('=') >= 0) {
                    params.forEach((param) => {
                        const [key, value] = param.split('=');
                        queryObject[key.trim()] = value.trim().replaceAll('\'', '');
                    })
                }

                if (queryObject.metric && queryObject.metric !== 'NA' && queryObject.group_by && queryObject.group_by !== 'NA') {

                    const metricParam = queryObject.metric === 'revenue'
                        ? 'sum(price__c)'
                        : 'count(quantity__c)';

                    const groupByParam = queryObject.group_by.indexOf('CALENDAR') >= 0
                        ? queryObject.group_by.replace('()', '(order_date__c)')
                        : queryObject.group_by;

                    const whereParams = [];

                    if (queryObject.location && queryObject.location !== 'NA') {
                        whereParams.push(`city__c = '${queryObject.location}'`);
                    }

                    if (queryObject.product_cat && queryObject.product_cat !== 'NA') {
                        whereParams.push(`product__c = '${queryObject.product_cat}'`);
                    }

                    if (queryObject.start_date && queryObject.start_date !== 'NA') {
                        whereParams.push(`order_date__c >= ${queryObject.start_date}`);
                    }

                    const whereText = whereParams.length
                        ? `WHERE ${whereParams.join(' AND ')}`
                        : ''

                    const queryText = `
SELECT ${groupByParam}, ${metricParam} ${queryObject.metric} FROM Order__c
    ${whereText}
    GROUP BY ${groupByParam} 
    ORDER BY ${metricParam}
    LIMIT 10`;

                    try {
                        await genChart(queryText);

                        setSoqlQuery(queryText);
                        textToDisplay = 'Generating report';
                    } catch (err) {
                        textToDisplay = 'Failed to generate report';
                    }



                } else {
                    textToDisplay = 'Cannot generate report, Please provide better instruction.';
                }

            } else {
                textToDisplay = truncateText(answerText);
            }

            // update report
            // if report is updated, speak 'Report updated'

        } else if (newTemplate === 'Workout Workflow') {
            // keep track of the current state of the workout progress.
            // update the new workout status
            textToDisplay = truncateText(answerText);
        } else {
            // generic Q & A
            textToDisplay = truncateText(answerText);
        }

        typeMessage(answerDiv, textToDisplay, async () => {
            answerDiv.scrollTop = answerDiv.scrollHeight;
            setChatHistory(newPromptArray);
        });

        speakMessage(textToDisplay, true);

        setAnswering(false);
        newChatHistoryMap[newTemplate] = newPromptArray;
        setChatHistoryMap(newChatHistoryMap);
        transcriptDiv.innerHTML = '';
        setSelectedTemplate(newTemplate);
    };

    const handleOnclickTest = () => {
        const answerDiv = document.querySelector('#answer-div');
        speakMessage(answerDiv.innerHTML, true);
    };

    function typeMessage(element, message, callback) {
        try {
            let i = 0;
            let intervalId = setInterval(() => {
                element.innerHTML += message.slice(i, i + 1);
                i++;
                if (i > message.length) {
                    clearInterval(intervalId);
                    if (callback) {
                        callback();
                    }
                }
            }, 30);
        } catch (err) {
            console.log(`typeMessage error detected: ${err}`);
        }
    }

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
            await startProcess();
            speakMessage('Let\'s start!');
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

    const handleResetClick = () => {
        const transcriptDiv = document.querySelector('#transcript-div');
        const answerDiv = document.querySelector('#answer-div');
        transcriptDiv.innerHTML = '';
        answerDiv.innerHTML = '';
        setChatHistory([]);
        updateTemplateRelatedInfo(selectedTemplate);
    };

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
        const { workContext, actions } = template;

        setCurrentWorkContext(workContext);
        setCurrentActions(actions);
    }

    const handleTemplateChange = (event, newValue) => {
        setSelectedTemplate(newValue.props.value);

        // update the actions list and context as well.
        updateTemplateRelatedInfo(newValue.props.value);
    };

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

    const genChart = async (soqlQuery) => {
        const sourceData = await makeQuery(soqlQuery);

        if (sourceData && sourceData.records && sourceData.records.length) {
            const { records } = sourceData;
            const firstRecord = records[0];
            let primary = null;
            let secondary = null;

            if (firstRecord.attributes.type !== 'AggregateResult') {
                console.log('This is not aggregation data, skip to process');
                return;
            }

            const availableKeys = Object.keys(firstRecord).filter((recordKey) => {
                return recordKey !== 'attributes'
            });

            if (availableKeys.length < 2) {
                console.log('There is not enough dimension in the data');
                return;
            }

            if (typeof firstRecord[availableKeys[0]] === 'string') {
                primary = availableKeys[0];
                secondary = availableKeys[1];
            } else {
                primary = availableKeys[1];
                secondary = availableKeys[0];
            }

            const data = sourceData.records.map((record) => {
                return {
                    'primary': record[primary],
                    'secondary': record[secondary]
                }
            })

            setChartData([
                {
                    label: secondary,
                    data
                }
            ]);
        }
    }

    const handleQueryClick = async () => {
        await genChart(soqlQuery);
    };

    const makeQuery = async (query) => {
        if (!query) {
            console.error('Empty query!');
            return;
        }

        const response = await axios.post('/query', {
            query
        });

        return response?.data;
    };

    const handleRestRequestClick = () => {
        const transcriptDiv = document.querySelector('#transcript-div');
        transcriptDiv.innerHTML = 'Let\'s start. Show me all the revenue';
        processAnswer();
    }

    return (
        <Container component="main" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'grid', gap: 2 }} id="controls">
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 1
                        }} align="center">
                            <Button variant="contained" disabled={playing} onClick={handleStartClick}>Start</Button>
                            <Button variant="contained" disabled={!playing} onClick={handleStopClick}>Stop</Button>
                            <Button variant="contained" disabled={playing} onClick={handleResetClick}>Reset</Button>
                        </Box>
                        <Box align="center">
                            <FormControl component="fieldset" variant="standard" align='left'>
                                <FormControl variant="standard" sx={{ display: devDisplay }}>
                                    <LanguageSelect
                                        onChange={handleLanguageChange}
                                        disabled={playing}
                                        value={language}
                                    />
                                </FormControl>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={noiseCanceling} onChange={handleNoiseCancelingChange} id="noise-canceling-checkbox" name="noise-canceling" />
                                        }
                                        label="Noise Suppression"
                                        disabled={playing}
                                        sx={{ display: devDisplay }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={autoGainControl} onChange={handleAutoGainChange} id="auto-gain-checkbox" name="auto-gain" />
                                        }
                                        label="Auto Gain Control"
                                        disabled={playing}
                                        sx={{ display: devDisplay }}
                                    />
                                </FormGroup>
                                <FormControl variant="standard" sx={{ mb: 1 }}>
                                    <InputLabel id="model-select-label" variant="standard" sx={{ display: devDisplay }}>Model</InputLabel>
                                    <Select
                                        labelId="model-select-label"
                                        id="model-select"
                                        label="Model"
                                        onChange={handleModelChange}
                                        disabled={playing}
                                        value={model}
                                        sx={{ display: devDisplay }}
                                    >
                                        <MenuItem value="text-ada-001">text-ada-001</MenuItem>
                                        <MenuItem value="text-babbage-001">text-babbage-001</MenuItem>
                                        <MenuItem value="text-curie-001">text-curie-001</MenuItem>
                                        <MenuItem value="text-davinci-003">text-davinci-003</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="standard">
                                    <InputLabel id="template-select-label" variant="standard">Current Context</InputLabel>
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
                                    </Select>
                                </FormControl>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={12}>
                        {
                            selectedTemplate === 'Analytics Workflow' && <BarChart data={chartData} />
                        }
                        {
                            selectedTemplate === 'Workout Workflow' && (
                                <Stepper activeStep={0} alternativeLabel>
                                    <Step>
                                        <StepLabel>Running</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>Swimming</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>Push-Ups</StepLabel>
                                    </Step>
                                </Stepper>
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
                    <Grid item xs={12} sm={12} sx={{ display: devDisplay }}>
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
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ display: devDisplay }}>
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
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ display: devDisplay }}>
                        <TextField
                            id="text-input"
                            label="Chat History"
                            variant="outlined"
                            multiline
                            sx={{ width: '100%' }}
                            rows={4}
                            value={chatHistory.join('\n')}
                            inputRef={textFieldRef}
                        />
                        <Button onClick={handleOnclickTest}>Repeat the chatGPT answer</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ display: devDisplay }}>
                        <Button onClick={handleQueryClick}>Gen Report</Button>
                        <Button onClick={handleRestRequestClick}>Test request</Button>
                    </Grid>
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

export default WorkGPT;
