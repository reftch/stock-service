require('dotenv').config();

const express = require('express');
const session = require('express-session');
const https = require('node:https');
const fs = require('node:fs');
const path = require('path');

const { ENV_PORT, ENV_PATH } = process.env;

// Basic middlewares path
const basicAuthMiddleware = require('./middlewares/basicAuthMiddleware');
// JWT middlewares path
const jwtAuthMiddleware = require('./middlewares/jwtAuthMiddleware');

// Routes path
const authRoute = require('./routes/authRoute');
const apiRoute = require('./routes/apiRoute');

// Express start
const app = express();
// Static files
app.use(ENV_PATH, express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'yourSecret',
  resave: false,
  saveUninitialized: false,
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${ENV_PATH}/api/v1/token`, basicAuthMiddleware, authRoute);
app.use(`${ENV_PATH}/api/v1`, jwtAuthMiddleware, apiRoute);

// Server Start
const options = {
  key: fs.readFileSync('./config/ssl/key.pem'),
  cert: fs.readFileSync('./config/ssl/cert.pem')
};

https.createServer(options, app).listen(ENV_PORT, () => {
  console.log(`Server is started on port ${ENV_PORT}`)
});