'use strict';
var annotate = require('annotate');
var snakeCase = require('snake-case');
var is = require('annois');


module.exports = annotate('parse-env', 'Parses configuration from env')
    .on(is.object, is.object, parse)
    .on(is.object, is.object, is.object, parse)
    .satisfies(is.object);

function parse(env, template, config) {
    return parseEnv(env, template, config);
}

function parseEnv(env, template, config, parent, prefix) {
    var verbose = parseInt(env.VERBOSE_PARSE_ENV, 10);
    var k, v, envVar, parsedEnv, value;

    if(!config) {
        config = {};
    }
    if(!parent) {
        parent = {};
    }

    for(k in template) {
        v = template[k];

        envVar = prefix? prefix + '_': '';
        envVar += snakeCase(k).toUpperCase();

        if(is.object(v)) {
            parent[k] = {};
            parseEnv(env, v, config[k], parent[k], envVar);
        }
        else {
            if(envVar in env) {
                value = env[envVar];

                parsedEnv = parseFloat(value, 10);

                if(value.length !== parsedEnv.toString().length) {
                    parent[k] = value;
                }
                else {
                    parent[k] = isNaN(parsedEnv)? value: parsedEnv;
                }
            }
            else if(config && k in config) {
                parent[k] = config[k];
            }
            else {
                parent[k] = v;

                if(verbose) {
                    console.warn('Failed to find value for ' + envVar);
                }
            }
        }
    }

    return parent;
}
