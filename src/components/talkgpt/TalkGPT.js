import React, { useState, useEffect, useRef } from "react";
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
import TextField from "@mui/material/TextField";

import LanguageSelect from '../common/LanguageSelect';

const HUMAN_PREFIX = 'Human:';
const AI_PREFIX = 'AI:';

function TalkGPT() {

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

    const [chatHistory, setChatHistory] = useState([
        // '\nHuman:\n\nhow are you?',
        // '\nAI:\n\nI am fine. How can I help you today?',
        // 'AI: I am an AI created by OpenAI. How can I help you today?',
        // 'Human: what do you like?',
        // 'AI: I love exploring new ideas and helping people improve their lives. I especially like to focus on making technology that is easy to use and helpful for everyone.',
        // 'Human: do you know what I like?',
        // 'AI: I don\'t know exactly what you like, but I can make some suggestions based on what I know about you. What are some activities or topics that you usually enjoy?',
        // 'Human: any things you can suggests to a 45 years old man?'
    ]);

    const textFieldRef = useRef(null);

    useEffect(() => {
        textFieldRef.current.scrollTop = textFieldRef.current.scrollHeight;
    }, [textFieldRef.current?.value]);


    const processAnswer = async () => {
        const transcriptDiv = document.querySelector('#transcript-div');
        const answerDiv = document.querySelector('#answer-div');
        const textToRead = transcriptDiv.innerHTML;

        console.log('sky debug 4000 synth is ', synth);


        if (!textToRead) {
            return;
        }

        const newPromptArray = chatHistory;

        newPromptArray.push(HUMAN_PREFIX + textToRead);

        const newPrompt = newPromptArray.join('\n');

        console.log('sky debug 4001 newPrompt is ', newPrompt);

        setAnswering(true);
        const token = process.env.OPENAI_API_KEY;
        const response = await axios.post('https://api.openai.com/v1/completions', {
            "model": model,
            "prompt": newPrompt,
            "temperature": 0.7,
            "max_tokens": 255,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "stop": [`${HUMAN_PREFIX}`, `${AI_PREFIX}`]
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });


        const answerText = response.data.choices[0].text;

        newPromptArray.push(answerText);
        

        const textToDisplay = answerText.slice(answerText.indexOf(':') + 1);

        console.log('sky debug 1003 textToDisplay are: ', textToDisplay);

        typeMessage(answerDiv, textToDisplay, () => {
            answerDiv.scrollTop = answerDiv.scrollHeight;
            setChatHistory(newPromptArray);
        });

        const utterance = new SpeechSynthesisUtterance(textToDisplay);
        utterance.lang = language;
        utterance.rate = 0.9;
        synth.speak(utterance);

        setAnswering(false);
        transcriptDiv.innerHTML = '';
    };

    const testSpeech = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = language;
        utterance.rate = 0.9;
        synth.speak(utterance);
    };

    const handleOnclickTest = () => {
        const answerDiv = document.querySelector('#answer-div');
        testSpeech(answerDiv.innerHTML);
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

    const startProcess = async () => {
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
                if (playing) {
                    setPlaying(false);
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
        if (speechRecognition) {
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
        testSpeech('Let\'s start!');
        setPlaying(true);
    };

    const handleStopClick = () => {
        testSpeech('Stop');
        setPlaying(false);
    };

    const handleResetClick = () => {
        const transcriptDiv = document.querySelector('#transcript-div');
        const answerDiv = document.querySelector('#answer-div');
        transcriptDiv.innerHTML = '';
        answerDiv.innerHTML = '';
        setChatHistory([]);
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


    return (
        <Container component="main" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={3}>
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
                                </FormControl>
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
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card raised sx={{ p: 2 }}><pre id="transcript-div" className={thinking ? 'thinking' : ''}></pre></Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card raised sx={{ p: 2 }}><pre id="answer-div" className={answering ? 'thinking' : ''}></pre></Card>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            id="text-input"
                            label="Chat History"
                            variant="outlined"
                            multiline
                            sx={{ width: '100%' }}
                            rows={4}
                            value={chatHistory.join('\n')}
                            // onChange={handleInputChange}
                            inputRef={textFieldRef}
                        />
                        <Button onClick={handleOnclickTest}>test answer</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default TalkGPT;
