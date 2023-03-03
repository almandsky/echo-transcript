const express = require('express');
const cors = require('cors');
const axios = require('axios');

const { getSalesforceAuthToken, queryData } = require('../src/server/utils/SalesforceClient');

require("dotenv").config();

const {
    OPENAI_API_KEY
} = process.env;

const app = express();

app.use(cors({
    origin: 'http://localhost:8080'
}));

app.use(express.json())

// output the console log
app.use((req, res, next) => {
  const dateTime = new Date().toISOString();
  console.log(`[API SERVER]: ${dateTime} ${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage || ''}`);
  next();
});

app.post("/completions", async (req, res) => {
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

// Start the server
app.listen(3001, () => {
  console.log('API Server started on port 3001');
});