import React, { useState, useEffect } from "react";
import { Prompt } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Slider from '@mui/material/Slider';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeOff from "@mui/icons-material/VolumeOff";
import VolumeUp from "@mui/icons-material/VolumeUp";

import { grey } from '@mui/material/colors';

import LanguageSelect from "../common/LanguageSelect";
import { typeMessage } from '../common/utils';

function EchoTranscript() {
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
    const [audioContext, setAudioContext] = useState(null);
    const [speechRecognition, setRecognition] = useState(null);
    const [thinking, setThinking] = useState(false);
    const [wakeLock, setWakeLock] = useState(null);
    const [wakeLockSupported, setWakeLockSupported] = useState(null);
    const [volume, setVolume] = useState(1);
    const [delayTime, setDelayTime] = useState(1);
    

    const startProcess = async () => {
        window?.gtag('event', 'startecho', {
            'event_category': language,
            'event_label': 'Start Echo Scribe'
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
                playWithDelay(stream);
            })
                .catch(error => {
                    console.error(error);
                });
        }

        if (speechRecognition) {
            speechRecognition.onresult = function (event) {
                const transcriptDiv = document.querySelector('#transcript-div');
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
                        typeMessage(transcriptDiv, message, () => {
                            transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
                        }, 10);
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

        localStream && localStream.getAudioTracks().forEach((audioTrack) => {
            if (audioTrack) {
                audioTrack.stop();
            }
        });

        if (audioContext) {
            audioContext.close();
        }


        if (wakeLockSupported && wakeLock) {
            wakeLock.release()
                .then(() => {
                    console.log('Wake Lock is released!');
                });
        }

        setThinking(false);
        window?.gtag('event', 'stopecho', {
            'event_category': language,
            'event_label': 'Stop Echo Scribe'
        });
    };

    // componentDidMount
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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

        setRecognition(recognition)
        setWakeLockSupported(tempWakeLockSupported);
        // based on is playing or not, either start the audio or stop.
    }, []);

    useEffect(() => {
        if (speechRecognition) {
            speechRecognition.lang = language;
        }
    }, [language]);

    const playWithDelay = (stream) => {
        let context;
        try {
            context = new AudioContext();
            const source = context.createMediaStreamSource(stream);
            // const volumeValue = parseInt(volume, 10);

            // const gainNode = context.createGain();
            // gainNode.gain.setValueAtTime(volumeValue, context.currentTime);

            const delayNode = context.createDelay();
            delayNode.delayTime.value = delayTime;

            source.connect(delayNode).connect(context.destination);

        } catch (err) {
            console.log(`playWithDelay error detected: ${err}`);
        }

        setAudioContext(context);
    };

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
    };

    const handleResetClick = () => {
        const transcriptDiv = document.querySelector('#transcript-div');
        transcriptDiv.innerHTML = '';
    };

    const handleLanguageChange = (event, newValue) => {
        setState({
            ...state,
            language: newValue.props.value
        });
    };

    const handleDelayTimeChange = (event, newValue) => {
        setDelayTime(newValue);
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
    };

    const handlePTTStart = async () => {
        // console.log("sky debug 1001 handlePTTStart");
        await startProcess()
    };

    const handlePTTStop = async () => {
        // console.log("sky debug 1002 handlePTTStop");
        stopProcess()
    };

    const handlePTTTouchStart = async () => {
        // console.log("sky debug 1003 handlePTTTouchStart");
        await startProcess()
    };

    const handlePTTTouchStop = async () => {
        // console.log("sky debug 1004 handlePTTTouchStop");
        stopProcess()
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
                    <Grid item xs={12} sm={5} md={4} sx={{ display: 'grid', gap: 2 }} id="controls">
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 1
                        }} align="center">
                            <Button variant="contained" disabled={playing} onClick={handleStartClick}>Start</Button>
                            <Button variant="contained" disabled={!playing} onClick={handleStopClick}>Stop</Button>
                            <Button variant="contained" disabled={playing} onClick={handleResetClick}>Reset</Button>
                        </Box>

                        {/* <Box align="center">
                            <Button
                                variant="contained"
                                onMouseDown={handlePTTStart}
                                onMouseUp={handlePTTStop}
                                onTouchStart={handlePTTTouchStart}
                                onTouchEnd={handlePTTTouchStop}
                                disabled={playing}
                            >
                                Push to Talk
                            </Button>
                        </Box> */}

                        <Box align="center">
                            <FormControl component="fieldset" variant="standard" align='left'>
                            <LanguageSelect
                                        onChange={handleLanguageChange}
                                        disabled={playing}
                                        value={language}
                                    />
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
                                    <Stack spacing={2} direction="row" alignItems="center">
                                        <Typography variant="caption">Delay:</Typography>
                                        <Slider
                                            aria-label="Delay"
                                            value={delayTime}
                                            onChange={handleDelayTimeChange}
                                            disabled={playing}
                                            valueLabelDisplay='auto'
                                            step={0.1}
                                            min={0}
                                            max={1}
                                            sx={{ minWidth: 50 }}
                                        />
                                    </Stack>
                                    {/* <Stack spacing={2} direction="row" alignItems="center">
                                        {
                                            volume ? (<VolumeDown sx={{ color: playing ? grey[500] : '' }} disabled={!playing} />) : (<VolumeOff sx={{ color: playing ? grey[500] : '' }} disabled={!playing} />)
                                        }
                                        <Slider
                                            aria-label="Volume"
                                            value={volume}
                                            onChange={handleVolumeChange}
                                            disabled={playing}
                                            valueLabelDisplay='auto'
                                            min={0}
                                            max={10}
                                            sx={{ minWidth: 50 }}
                                        />
                                        <VolumeUp sx={{ color: playing || !volume ? grey[500] : '' }} disabled={!playing} />
                                    </Stack> */}
                                </FormGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={7} md={8}>
                        <Typography variant="caption">You said:</Typography>
                        <Card raised sx={{
                            p: 2
                        }}><pre id="transcript-div" className={thinking ? 'thinking' : ''}></pre></Card>
                    </Grid>
                    <Prompt
                        when={playing}
                        // message="Are you sure you want to leave this page? Your microphone is still being used."
                        message={(location) => {
                            if (location.pathname === '/') {
                                return true;
                            }
                            stopProcess();
                            return ('The Echo Scribe is stop when you navigate to other page.');
                        }}
                    />
                </Grid>
            </Paper>
        </Container>
    );
}

export default EchoTranscript;
