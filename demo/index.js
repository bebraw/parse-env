#!/usr/bin/env node
var parseEnv = require('../lib/parse-env');

var tpl = require('./config.template');

// the configuration file is optional and doesn't have to exist
var conf = {};

try {
    conf = require('./config');
}
catch(e) {}

// normally you would do this
// module.exports = parseEnv(process.env, tpl, conf);

// now i'm just printing out the output
console.log(parseEnv(process.env, tpl, conf));
