import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './common/Header';
import EchoTranscript from './echotranscript/EchoTranscript';
import TalkGPT from './talkgpt/TalkGPT';
import WorkGPT from './workgpt/WorkGPT';
import AboutPage from './about/About';
import PageNotFound from './PageNotFound';

import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";
import AuthContext from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

const theme = createTheme();

function App(props) {

  const [auth, setAuth] = useState(null);
  const [tokenRenewalComplete, setTokenRenewalComplete] = useState(false);


  // componentDidMount
  useEffect(() => {

    const authInstance = new Auth(props.history);

    authInstance.renewToken(() => {
      setTokenRenewalComplete(true)
    });


    setAuth(authInstance);

    // Service Worker
    if (process.env.NODE_ENV === 'production') {
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
    }

  }, []);

  return (
    
      <AuthContext.Provider value={auth}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header auth={auth} />
          <Switch>
            <Route exact path="/" component={EchoTranscript} />
            <Route
              path="/callback"
              render={props => <Callback auth={auth} {...props} />}
            />
            {/* <Route exact path="/talkgpt" component={TalkGPT} /> */}
            <PrivateRoute path="/talkgpt" component={TalkGPT} scopes={["read:completions"]} />
            <PrivateRoute path="/workgpt" component={WorkGPT} scopes={["read:completions", "read:workgpt"]} />
            <Route path="/about" component={AboutPage} />
            <Route component={PageNotFound} />
          </Switch>
        </ThemeProvider>
      </AuthContext.Provider>
  );
}

export default App;
