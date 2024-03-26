const express = require('express');
const compression = require('compression');
const path = require('path');
const axios = require('axios');

const { expressjwt: jwt } = require("express-jwt"); // Validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const checkScope = require("express-jwt-authz"); // Validate JWT scopes
const TurndownService = require('turndown');
const pdf2md = require('@opendocsg/pdf2md');
const multer = require('multer');
const upload = multer();

const { getSalesforceAuthToken, queryData } = require('./src/server/utils/SalesforceClient');

require("dotenv").config();

const turndownService = new TurndownService();

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
  OPENAI_API_KEY,
  GROQ_API_KEY
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

app.post("/completions_groq", checkJwt, checkScope(["read:completions"], { customScopeKey: 'permissions', customUserKey: 'auth' }), async (req, res) => {
  try {
      const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', req.body, {
          headers: {
              'Authorization': `Bearer ${GROQ_API_KEY}`,
          },
      });

      console.log(response.data.choices[0]);

      const responseData = response.data.choices[0].message.content;
      res.send(responseData);
  } catch (err) {
      // Handle errors
      console.error(err.message);
      res.status(500).send(err.message);
  }
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

app.post("/turndown", async (req, res) => {
  if (!req.body.text) {
      console.error(`Empty Text!`);
      res.status(500).send('Empty Text!');
  } else {
      let response = null;
      const start = Date.now();
      try {
          const { text } = req.body;

          response = turndownService.turndown(text)
          
          console.log(response);
          res.send(response);
      } catch (err) {
          console.error(err.message);
          res.status(500).send(err.message);
      }

      const msResponseTime = Date.now() - start;
      console.log(`Turndown text in ${msResponseTime}`);
  }
});

app.post('/upload-pdf', upload.single('pdfFile'), async (req, res) => {
  try {
      // Check if data has been uploaded
      // Check if a file has been uploaded
      if (!req.file) {
          return res.status(400).send('No file uploaded.');
      }

      // Access the uploaded file buffer
      const pdfBuffer = req.file.buffer;

      // Convert PDF to markdown
      try {
          const text = await pdf2md(pdfBuffer);
          res.status(200).send(text);
      } catch (err) {
          console.error(err);
          res.status(500).send(err.message);
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
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
