#!/usr/bin/env node
const listen = require('../lib/server').listen;
listen(process.env.NODE_PORT || 8080);
