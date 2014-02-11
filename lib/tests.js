#!/usr/bin/env node
var assert = require('assert');

var parseEnv = require('./parse-env');


tests();

function tests() {
    testWarning();
    testWarningMuted();
    testConfigurationLoading();
    testEnvOverride();
}

function testWarning() {
    var triggered = false;
    console.warn = function() {
        triggered = true;
    };

    parseEnv({MUTE_PARSE_ENV: 0}, {demo: 4}, {});

    assert(triggered, 'Did not trigger warning!');
}

function testWarningMuted() {
    var triggered = false;
    console.warn = function() {
        triggered = true;
    };

    parseEnv({MUTE_PARSE_ENV: 1}, {foo: 12});

    assert(!triggered, 'Triggered warning!');
}

function testConfigurationLoading() {
    var value = 'demo';
    var conf = parseEnv({}, {demo: 'foobar'}, {demo: 'bar'});

    assert(conf.demo, value);
}

function testEnvOverride() {
    var value = 'demo';
    var conf = parseEnv({DEMO: value}, {demo: 'foobar'}, {demo: 'bar'});

    assert(conf.demo, value);
}
