/*
///////////////////
// Dependencies //
/////////////////
*/

require('dotenv').config();

const { client } = require('./db');
client.connect();

const PORT = 1313;
const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const apiRouter = require('./api');
server.use('/api', apiRouter);

/*
////////////////////////
// Request Listeners //
//////////////////////
*/

server.listen(PORT, () => {
    console.log('The server is up on port', PORT);
});

server.use((req, res, next) => {
    console.log("<---- Body Logger START ---->");
    console.log(req.body);
    console.log("<---- Body Logger END ---->");

    next();
});
