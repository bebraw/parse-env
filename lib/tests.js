#!/usr/bin/env node
var assert = require('assert');

var generators = require('annogenerate');
var fuzz = require('annofuzz')(generators);

var parseEnv = require('./parse-env');
var utils = require('./utils');

// TODO: assert that environment variables override configuration ones
// TODO: assert that configuration variables override template ones


tests();

function tests() {
    testWarning();
    testWarningDisabled();
    testUpperWord();
}

function testWarning() {
    var triggered = false;
    console.warn = function() {triggered = true;};

    var mute = process.env.MUTE_PARSE_ENV;

    process.env.MUTE_PARSE_ENV = 0;
    parseEnv({}, {demo: 4}, {});
    process.env.MUTE_PARSE_ENV = mute;

    assert(triggered, 'Did not trigger warning!');
}

function testWarningDisabled() {
    var triggered = false;
    console.warn = function() {triggered = true;};

    parseEnv({MUTE_PARSE_ENV: 1}, {foo: 12});

    assert(!triggered, 'Triggered warning!');
}

function testUpperWord() {
    assert.equal(utils.toEnvVar('writeJson'), 'WRITE_JSON');
    assert.equal(utils.toEnvVar('writeJSON'), 'WRITE_JSON');
}

// assert that all characters are upper
fuzz(utils.toEnvVar, function(op, str) {
    var parts = op(str).split('');

    return parts.map(isUpper).filter(id).length == parts.length;
}, 100);

function id(a) {return a;}
function isUpper(a) {return a && a === a.toUpperCase();}
