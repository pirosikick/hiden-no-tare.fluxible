#!/usr/bin/env node
require('babel-register');
const listen = require('../src/server').listen;
listen(process.env.NODE_PORT || 8080);
