#!/usr/bin/env node
var assert = require('assert');

var parseEnv = require('./parse-env');

// TODO: assert that environment variables override configuration ones
// TODO: assert that configuration variables override template ones


tests();

function tests() {
    testWarning();
    testWarningMuted();
}

function testWarning() {
    var triggered = false;
    console.warn = function() {
        triggered = true;
    };

    var mute = process.env.MUTE_PARSE_ENV;

    process.env.MUTE_PARSE_ENV = 0;
    parseEnv({}, {demo: 4}, {});
    process.env.MUTE_PARSE_ENV = mute;

    assert(triggered, 'Did not trigger warning!');
}

function testWarningMuted() {
    var triggered = false;
    console.warn = function() {
        triggered = true;
    };

    var mute = process.env.MUTE_PARSE_ENV;

    process.env.MUTE_PARSE_ENV = 1;
    parseEnv({MUTE_PARSE_ENV: 1}, {foo: 12});
    process.env.MUTE_PARSE_ENV = mute;

    assert(!triggered, 'Triggered warning!');
}
