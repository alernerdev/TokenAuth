// main starting point

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');

const keys = require("./config/keys");
const DB = require("./db.js");

console.log(chalk.green(`Environment: ${process.env.NODE_ENV}`));

DB.connect(keys.mongoURI);

const router = require('./router');

const app = express();

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(chalk.green(`Server listening on port '${port}`));