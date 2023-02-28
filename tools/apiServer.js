const express = require('express');
const cors = require('cors');
const axios = require('axios');

require("dotenv").config();

const { OPENAI_API_KEY } = process.env;


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
        console.error(err);
        res.status(500).send(err);
    }
});

// Start the server
app.listen(3001, () => {
  console.log('API Server started on port 3001');
});
