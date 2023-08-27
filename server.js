const express = require('express');
const compression = require('compression');
const path = require('path');
const axios = require('axios');

const { expressjwt: jwt } = require("express-jwt"); // Validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const checkScope = require("express-jwt-authz"); // Validate JWT scopes

const { getSalesforceAuthToken, queryData } = require('./src/server/utils/SalesforceClient');

class MyClassificationPipeline {
  static task = 'feature-extraction';
  static model = 'Xenova/all-MiniLM-L6-v2';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // Dynamically import the Transformers.js library
      let { pipeline, env } = await import('@xenova/transformers');

      // NOTE: Uncomment this to change the cache directory
      // env.cacheDir = './.cache';

      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

// Comment out this line if you don't want to start loading the model as soon as the server starts.
// If commented out, the model will be loaded when the first request is received (i.e,. lazily).
MyClassificationPipeline.getInstance();

require("dotenv").config();

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
    jwksUri: `https://${process.env.AUTH0_DOMAIN
      }/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"]
});

const {
  OPENAI_API_KEY
} = process.env;

const app = express();

app.use(compression());
app.use(express.json())

// output the console log
app.use((req, res, next) => {
  const dateTime = new Date().toISOString();
  console.log(`${dateTime} ${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage || ''}`);
  next();
});

app.post("/completions", checkJwt, checkScope(["read:completions"], { customScopeKey: 'permissions', customUserKey: 'auth' }), async (req, res) => {
  try {
      const response = await axios.post('https://api.openai.com/v1/completions', req.body, {
          headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
      });

      const responseData = response.data.choices[0].text;
      res.send(responseData);
  } catch (err) {
      // Handle errors
      console.error(err.message);
      res.status(500).send(err.message);
  }
});

app.post("/query", async (req, res) => {
  console.log(`getting query ${req.body}`);
  if (!req.body.query) {
      console.error(`Empty Query!`);
      res.status(500).send('Empty Query!');

  } else {
      let response = null;
      const start = Date.now();
      try {
          const accessToken = await getSalesforceAuthToken();
          const { query } = req.body;
          const data = await queryData({ query, accessToken });
          response = data;
          res.send(response);
      } catch (err) {
          console.error(err.message);
          res.status(500).send(err.message);
      }
    
      const msResponseTime = Date.now() - start;
      console.log(`Received query response from in ${msResponseTime}`);
  }
});

app.post("/embed", async (req, res) => {
  if (!req.body.text) {
      console.error(`Empty Text!`);
      res.status(500).send('Empty Text!');

  } else {
      let response = null;
      const start = Date.now();
      try {
          const { text } = req.body;
          console.log(JSON.stringify(text));
          const classifier = await MyClassificationPipeline.getInstance();
          response = await classifier(text, {
              pooling: 'mean',
              normalize: true,
          });
          console.log(response);
          res.send(response);
      } catch (err) {
          console.error(err.message);
          res.status(500).send(err.message);
      }
    
      const msResponseTime = Date.now() - start;
      console.log(`Embedded text in ${msResponseTime}`);
  }
});

// Serve static assets
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
