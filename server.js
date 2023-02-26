const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

app.use(compression());

// output the console log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage}`);
  next();
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
