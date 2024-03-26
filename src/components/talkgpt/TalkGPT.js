import React, { useState, useEffect, useRef } from "react";
import { Prompt } from 'react-router-dom';
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import LanguageSelect from '../common/LanguageSelect';
import { generateChat, generateChatGroq } from '../common/systemWorkers';

import ChatHistory from "../ChatHistory/ChatHistory";

import { typeMessage, truncateText } from '../common/utils';


const HUMAN_PREFIX = 'Human:';

const INBOUND = 'INBOUND';
const OUTBOUND = 'OUTBOUND';

const MAX_HISTORY = 10;

const INIT_MESSAGE = {
    user: 'chatGPT',
    message: 'Hi!  How can I help you?',
    type: INBOUND
};

function TalkGPT(props) {

    const debug = true;

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
    const [speechRecognition, setRecognition] = useState(null);
    const [synth, setSynth] = useState(null);
    const [thinking, setThinking] = useState(false);
    const [answering, setAnswering] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [wakeLock, setWakeLock] = useState(null);
    const [wakeLockSupported, setWakeLockSupported] = useState(null);
    const [model, setModel] = useState('gpt-3.5-turbo-instruct');

    const [chatHistory, setChatHistory] = useState([]);
    const [displayChatHistory, setDisplayChatHistory] = useState([]);
    const [userProfile, setUserProfile] = useState([]);

    const [testMessage, setTestMessage] = useState('tell me a joke');


    const addChatHistory = ({ user, message, type}) => {
        const currentTime = new Date();

        const newMessage = {
            id: uuidv4(),
            user,
            message,
            type,
            createdDate: currentTime.toLocaleTimeString()
        }

        const newChatHistory = displayChatHistory;
        newChatHistory.push(newMessage);

        setDisplayChatHistory(newChatHistory);
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

    const processAnswer = async () => {
        // const supportedVoices = window.speechSynthesis.getVoices();
        const transcriptDiv = document.querySelector('#transcript-div');
        const answerDiv = document.querySelector('#answer-div');
        const textToRead = transcriptDiv.innerHTML;

        if (!textToRead) {
            return;
        }

        const newPromptArray = chatHistory;

        newPromptArray.push(HUMAN_PREFIX + textToRead);

        const newPrompt = newPromptArray.length > MAX_HISTORY
            ? newPromptArray.slice(-MAX_HISTORY).join('\n')
            : newPromptArray.join('\n');

        window?.gtag('event', 'call_openai_start', {
            'event_category': language,
            'event_label': 'Making API call to openAI',
            'value': newPrompt.length
        });

        setAnswering(true);

        const answerText = await generateChatGroq({
            auth: props.auth,
            model,
            newPrompt,
            temperature: 0.5
        });

        newPromptArray.push(answerText);

        window?.gtag('event', 'call_openai_completed', {
            'event_category': language,
            'event_label': 'Received API response from openAI',
            'value': answerText.length
        });
        
        const textToDisplay = truncateText(answerText);

        addChatHistory({
            user: 'chatGPT',
            message: textToDisplay,
            type: INBOUND
        });

        setAnswering(false);

        typeMessage(answerDiv, textToDisplay, () => {
            answerDiv.scrollTop = answerDiv.scrollHeight;
            transcriptDiv.innerHTML = '';
            setChatHistory(newPromptArray);
            
        });

        

        speakMessage(textToDisplay, true);

    };

    const startProcess = async () => {
        window?.gtag('event', 'starttalk', {
            'event_category': language,
            'event_label': 'Start Talk to chatGPT'
        });
        

        if (speechRecognition) {
            if (!initialized) {
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
                            addChatHistory({
                                user: userProfile.nickname,
                                message,
                                type: OUTBOUND
                            })
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

                // setInitialized(true);
            }

            speechRecognition.start();

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
        window?.gtag('event', 'stoptalk', {
            'event_category': language,
            'event_label': 'Stop Talk to chatGPT'
        });
        if (speechRecognition) {
            speechRecognition.onend = null;
            speechRecognition.stop();
        }

        if (synth) {
            synth.cancel()
        }

        if (wakeLockSupported && wakeLock) {
            wakeLock.release()
                .then(() => {
                    console.log('Wake Lock is released!');
                });
        }

        setThinking(false);
    };

    const loadUserProfile = () => {
        props.auth.getProfile((profile, error) => {
            if (!error) {
                setUserProfile(profile);
            } else {
                console.log(error);
            }
        });
    }

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

        loadUserProfile();

        setRecognition(recognition);
        setSynth(synthesis);
        setWakeLockSupported(tempWakeLockSupported);
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
        } else {
            stopProcess();
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
        setDisplayChatHistory([]);
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

    const handleTestMessageChange = (event) => {
        setTestMessage(event.target.value);
    };

    const handleRestRequestClick = async () => {
        const transcriptDiv = document.querySelector('#transcript-div');
        const answerDiv = document.querySelector('#answer-div');
        answerDiv.innerHTML = '';
        transcriptDiv.innerHTML = testMessage;


        addChatHistory({
            user: userProfile.nickname,
            message: testMessage,
            type: OUTBOUND
        });

        await processAnswer();

        if (speechRecognition) {
            speechRecognition.stop();
        }
    }


    return (
        <Container component="main" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
                <ChatHistory history={displayChatHistory} />
                { (debug) && <Grid item xs={12} sm={12} sx={{ marginTop: '1rem' }}>
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
                        <Button sx={{ marginTop: '0.5rem' }}onClick={handleRestRequestClick} variant="contained">Test request</Button>
                    </Grid>}
                <Grid container spacing={3} sx={{ marginTop: '1rem' }}>
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
                                <FormControl variant="standard">
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
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={autoGainControl} onChange={handleAutoGainChange} id="auto-gain-checkbox" name="auto-gain" />
                                        }
                                        label="Auto Gain Control"
                                        disabled={playing}
                                    />
                                </FormGroup>
                                <FormControl variant="standard">
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
                                        <MenuItem value="gpt-3.5-turbo-instruct">gpt-3.5-turbo-instruct</MenuItem>
                                    </Select>
                                </FormControl>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="caption">You said:</Typography>
                        <Card raised sx={{ p: 1 }}><pre id="transcript-div" className={thinking ? 'thinking' : ''}></pre></Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="caption">chatGPT said:</Typography>
                        <Card raised sx={{ p: 1, bgcolor: '#defcfc', marginBottom: '1rem' }}><pre id="answer-div" className={answering ? 'thinking' : ''}></pre></Card>
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

TalkGPT.propTypes = {
    auth: PropTypes.object.isRequired
};

export default TalkGPT;
