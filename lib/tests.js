#!/usr/bin/env node
var generators = require('annogenerate');
var fuzz = require('annofuzz')(generators);

var parseEnv = require('./parse-env');
var utils = require('./utils');

// TODO: assert that environment variables override configuration ones
// TODO: assert that configuration variables override template ones


fuzz();

// assert that all characters are upper
fuzz(utils.toEnvVar, function(op, str) {
    var parts = op(str).split('');

    return parts.map(isUpper).filter(id).length == parts.length;
}, 100);

function id(a) {return a;}
function isUpper(a) {return a && a === a.toUpperCase();}
