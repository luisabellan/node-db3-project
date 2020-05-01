"use strict";

var express = require('express');

var SchemeRouter = require('./schemes/scheme-router.js');

var server = express();
server.use(express.json());
server.use('/api/schemes', SchemeRouter);
module.exports = server;