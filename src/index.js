import "./index.css";

const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const resetButton = document.querySelector('#reset-button');
const languageSelect = document.getElementById("language-select");
const noiseCancelingCheckbox = document.getElementById("noise-canceling-checkbox");
const autoGainCheckbox = document.getElementById("auto-gain-checkbox");
const volumeSlider = document.getElementById("volume-slider");
const volumeSliderOutput = document.getElementById("volume-value");

volumeSlider.oninput = function() {
    volumeSliderOutput.innerHTML = this.value;
}

const transcriptDiv = document.querySelector('#transcript-div');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;
}

let localStream;
let noiseCanceling = true;
let autoGainControl = true;

let context;

let playing = false;

let wakeLock;
let wakeLockSupported = false;

if ('wakeLock' in window.navigator) {
    wakeLockSupported = true;
    console.log('Screen Wake Lock API supported!')
} else {
    console.log('Wake lock is not supported by this browser.')
}


languageSelect.addEventListener("change", function () {
    const language = languageSelect.options[languageSelect.selectedIndex].value;
    if (recognition) {
        recognition.lang = language;
    }
    
});

noiseCancelingCheckbox.addEventListener("change", function () {
    const noiseCancelingValue = noiseCancelingCheckbox.checked;
    noiseCanceling = noiseCancelingValue;
});

autoGainCheckbox.addEventListener("change", function () {
    const autoGainValue = autoGainCheckbox.checked;
    autoGainControl = autoGainValue;
});

resetButton.addEventListener("click", function () {
    transcriptDiv.innerHTML = '';
});

const handleStart = () => {
    startButton.setAttribute('disabled', true);
    resetButton.setAttribute('disabled', true);
    languageSelect.setAttribute('disabled', true);
    noiseCancelingCheckbox.setAttribute('disabled', true);
    autoGainCheckbox.setAttribute('disabled', true);
    volumeSlider.setAttribute('disabled', true);

    stopButton.removeAttribute('disabled');
}

const handleStop = () => {
    startButton.removeAttribute('disabled');
    resetButton.removeAttribute('disabled');
    languageSelect.removeAttribute('disabled');
    noiseCancelingCheckbox.removeAttribute('disabled');
    autoGainCheckbox.removeAttribute('disabled');
    volumeSlider.removeAttribute('disabled');

    transcriptDiv.classList.remove("thinking");
    stopButton.setAttribute('disabled', true);
}

startButton.addEventListener('click', async function () {
    playing = true;
    handleStart();

    if (window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia) {
        window.navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: noiseCanceling,
                autoGainControl: autoGainControl,
                echoCancellation: false,
                sampleRate: 192000,
                sampleSize: 24
            },
        })
        .then(stream => {
            localStream = stream;
            if (recognition) {
                recognition.mediaStream = stream;
            }
            playWithDelay(stream);
        })
        .catch(error => {
            console.error(error);
        });
    }
    

    if (recognition) {
        recognition.onresult = function (event) {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    transcriptDiv.classList.remove("thinking");
                    let message = result[0].transcript.trim();

                    if (message.toLowerCase() === 'break' || message.toLowerCase() === 'line break' || message.toLowerCase() === 'next line') {
                        message = '\n';
                    } else if (message.toLowerCase() === 'stop') {
                        stopButton.click();
                        message = '';
                    } else if (message.toLowerCase() === 'reset') {
                        message = '';
                        transcriptDiv.innerHTML = '';
                    } else {
                        message += '. ';
                    }

                    typeMessage(transcriptDiv, message, ()=> {
                        transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
                    });
                } else {
                    transcriptDiv.classList.add("thinking");
                }
            }
        };
        recognition.start();

        recognition.onerror = (event) => {
            console.log(`Speech recognition error detected: ${event.error}`);
            console.log(`Additional information: ${event.message}`);
            console.log(`event information: ${JSON.stringify(event)}`);
            // try to restart
            if (event.error === 'network') {
                recognition.stop();
                recognition.start();
            }
        }

        // log other events

        recognition.onaudiostart = (event) => {
            console.log(`onaudiostart: ${JSON.stringify(event)}`);
        }
        
        recognition.onaudioend = (event) => {
            console.log(`onaudioend: ${JSON.stringify(event)}`);
        }

        recognition.onend = (event) => {
            console.log(`onend: ${JSON.stringify(event)}`);
            if (playing) {
                // restart the recognition if user is still playing
                recognition.stop();
                recognition.start();
            }
        }

        recognition.onnomatch = (event) => {
            console.log(`onnomatch: ${JSON.stringify(event)}`);
        }

        recognition.onsoundstart = (event) => {
            console.log(`onsoundstart: ${JSON.stringify(event)}`);
        }

        recognition.onsoundend = (event) => {
            console.log(`onsoundend: ${JSON.stringify(event)}`);
        }

        recognition.onspeechstart = (event) => {
            console.log(`onspeechstart: ${JSON.stringify(event)}`);
        }

        recognition.onspeechend = (event) => {
            console.log(`onspeechend: ${JSON.stringify(event)}`);
        }

        recognition.onstart = (event) => {
            console.log(`onstart: ${JSON.stringify(event)}`);
        }

        if (wakeLockSupported) {
             // Listen for wake lock release
            try {
                // Request a screen wake lock
                wakeLock = await window.navigator.wakeLock.request();
                console.log('Wake Lock is active!');
                wakeLock.addEventListener('release', () => {
                    console.log(`Screen Wake Lock released: ${wakeLock.released}`);
                });
            } catch (err) {
                // The Wake Lock request has failed - usually system related, such as battery.
                console.log(`${err.name}, ${err.message}`);
            }
        }
    }
});


stopButton.addEventListener('click', async function () {
    playing = false;
    if (recognition) {
        recognition.stop();
    }

    localStream && localStream.getAudioTracks().forEach((audioTrack) => {
        if (audioTrack) {
            audioTrack.stop();
        }
    });

    if (context) {
        context.close().then(() => {
            console.log('AudioContext is closed.');
            handleStop();
        });
    } else {
        handleStop();
    }
    

    if (wakeLockSupported) {
        wakeLock.release()
            .then(() => {
                console.log('Wake Lock is released!');
            });
    }
});


const playWithDelay = function (stream) {
    try {
        context = new AudioContext();
        const source = context.createMediaStreamSource(stream);
        const volumeValue = parseInt(volumeSlider.value, 10);

        const gainNode = context.createGain();
        gainNode.gain.setValueAtTime(volumeValue, context.currentTime);

        source.connect(gainNode);
        gainNode.connect(context.destination);

    } catch (err) {
        console.log(`playWithDelay error detected: ${err}`);
    }
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
        }, 20);
    } catch (err) {
        console.log(`typeMessage error detected: ${err}`);
    }
    
}

document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        wakeLock = await window.navigator.wakeLock.request('screen');
    }
});

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
