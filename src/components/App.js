import React, { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
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
import Slider from '@mui/material/Slider';
import Stack from "@mui/material/Stack";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeOff from "@mui/icons-material/VolumeOff";
import VolumeUp from "@mui/icons-material/VolumeUp";

import { grey } from '@mui/material/colors';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

function App() {
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

            typeMessage(transcriptDiv, message, () => {
              transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
            });
            setThinking(false);
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

    // Service Worker
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        reg.installing; // the installing worker, or undefined
        reg.waiting; // the waiting worker, or undefined
        reg.active; // the active worker, or undefined

        reg.addEventListener('updatefound', () => {
          // A wild service worker has appeared in reg.installing!
          const newWorker = reg.installing;

          newWorker.state;
          // "installing" - the install event has fired, but not yet complete
          // "installed"  - install complete
          // "activating" - the activate event has fired, but not yet complete
          // "activated"  - fully active
          // "redundant"  - discarded. Either failed install, or it's been
          //                replaced by a newer version

          newWorker.addEventListener('statechange', (event) => {
            // newWorker.state has changed
            console.log('SW statechange event!', event);
          });
          console.log('SW registered!', reg);
        })
      })
      .catch(err => console.log('Boo!', err));

    navigator.serviceWorker.addEventListener('controllerchange', (reg) => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.
      console.log('SW controller changed!', reg);
    });

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
      const volumeValue = parseInt(volume, 10);

      const gainNode = context.createGain();
      gainNode.gain.setValueAtTime(volumeValue, context.currentTime);

      source.connect(gainNode);
      gainNode.connect(context.destination);

    } catch (err) {
      console.log(`playWithDelay error detected: ${err}`);
    }

    setAudioContext(audioContext);
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

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Echo Transcript
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} sx={{ display: 'grid', gap: 2 }} id="controls">
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
                  <InputLabel id="language-select-label" variant="standard">Language</InputLabel>
                  <Select
                    labelId="language-select-label"
                    id="language-select"
                    label="Language"
                    onChange={handleLanguageChange}
                    disabled={playing}
                    value={language}
                  >
                    <MenuItem value="ar-SA">Arabic Saudi Arabia</MenuItem>
                    <MenuItem value="cs-CZ">Czech Czech Republic</MenuItem>
                    <MenuItem value="da-DK">Danish Denmark</MenuItem>
                    <MenuItem value="de-DE">German Germany</MenuItem>
                    <MenuItem value="el-GR">Modern Greek Greece</MenuItem>
                    <MenuItem value="en-AU">English (Australia)</MenuItem>
                    <MenuItem value="en-GB">English (United Kingdom)</MenuItem>
                    <MenuItem value="en-IE">English (Ireland)</MenuItem>
                    <MenuItem value="en-US">English (United States)</MenuItem>
                    <MenuItem value="en-ZA">English (South Africa)</MenuItem>
                    <MenuItem value="es-ES">Spanish (Spain)</MenuItem>
                    <MenuItem value="es-MX">Spanish (Mexico)</MenuItem>
                    <MenuItem value="fi-FI">Finnish Finland</MenuItem>
                    <MenuItem value="fr-CA">French (Canada)</MenuItem>
                    <MenuItem value="fr-FR">French (France)</MenuItem>
                    <MenuItem value="he-IL">Hebrew Israel</MenuItem>
                    <MenuItem value="hi-IN">Hindi India</MenuItem>
                    <MenuItem value="hu-HU">Hungarian Hungary</MenuItem>
                    <MenuItem value="id-ID">Indonesian Indonesia</MenuItem>
                    <MenuItem value="it-IT">Italian Italy</MenuItem>
                    <MenuItem value="ja-JP">Japanese Japan</MenuItem>
                    <MenuItem value="ko-KR">Korean Republic of Korea</MenuItem>
                    <MenuItem value="nl-BE">Dutch Belgium</MenuItem>
                    <MenuItem value="nl-NL">Dutch Netherlands</MenuItem>
                    <MenuItem value="no-NO">Norwegian Norway</MenuItem>
                    <MenuItem value="pl-PL">Polish Poland</MenuItem>
                    <MenuItem value="pt-BR">Portuguese Brazil</MenuItem>
                    <MenuItem value="pt-PT">Portuguese Portugal</MenuItem>
                    <MenuItem value="ro-RO">Romanian Romania</MenuItem>
                    <MenuItem value="ru-RU">Russian Russian Federation</MenuItem>
                    <MenuItem value="sk-SK">Slovak Slovakia</MenuItem>
                    <MenuItem value="sv-SE">Swedish Sweden</MenuItem>
                    <MenuItem value="th-TH">Thai Thailand</MenuItem>
                    <MenuItem value="tr-TR">Turkish Turkey</MenuItem>
                    <MenuItem value="zh-CN">Chinese (China)</MenuItem>
                    <MenuItem value="zh-HK">Chinese (Hong Kong)</MenuItem>
                    <MenuItem value="zh-TW">Chinese (Taiwan)</MenuItem>
                  </Select>
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
                      {
                        volume ? (<VolumeDown sx={{ color: playing ? grey[500] : '' }}  disabled={!playing}/>) : (<VolumeOff sx={{ color: playing ? grey[500] : '' }}  disabled={!playing} />)
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
                      <VolumeUp sx={{ color: playing || !volume ? grey[500] : '' }} disabled={!playing}/>
                    </Stack>
                  </FormGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card raised sx={{
                p: 2
              }}><pre id="transcript-div" className={thinking ? 'thinking' : ''}></pre></Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
