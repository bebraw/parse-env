#!/usr/bin/env node
'use strict';
var assert = require('assert');

var parseEnv = require('./parse-env');


tests();

function tests() {
    testVerbose();
    testVerboseMuted();
    testConfigurationLoading();
    testEnvOverride();
    testStringParsing();
    testNumberParsing();
    testZeroParsing();
    testStringStartingWithNumberParsing();
}

function testVerbose() {
    var triggered = false;
    console.warn = function() {
        triggered = true;
    };

    parseEnv({VERBOSE_PARSE_ENV: 1}, {demo: 4}, {});

    assert(triggered, 'Did not trigger warning!');
}

function testVerboseMuted() {
    var triggered = false;
    console.warn = function() {
        triggered = true;
    };

    parseEnv({VERBOSE_PARSE_ENV: 0}, {foo: 12});

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

function testStringParsing() {
    var ga = 'UA-12345';
    var conf = parseEnv({GA: ga}, {ga: 'replace this'});

    assert.strictEqual(conf.ga, ga);
}

function testNumberParsing() {
    var port = 8000;
    // env variables are always strings!
    var conf = parseEnv({PORT: port.toString()}, {port: 3000});

    assert.strictEqual(conf.port, port);
}

function testZeroParsing() {
    var port = 0;
    var conf = parseEnv({PORT: port.toString()}, {port: 3000});

    assert.strictEqual(conf.port, port);
}

function testStringStartingWithNumberParsing() {
    var key ='123foo';
    var conf = parseEnv({KEY: key}, {key: 'replace this'});

    assert.strictEqual(conf.key, key);
}
