// main starting point

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');

// load .env values and hang them off the process.env
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}

const router = require('./router');

const app = express();

console.log(process.env.MONGODB);
// mongoose.connect(process.env.MONGODB);

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(chalk.blue(`Server listening on port '${port}`));