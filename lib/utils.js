var annotate = require('annotate');
var is = require('annois');


function toEnvVar(str) {
    var ret = '';

    str.split(/([A-Z])/).forEach(function(v) {
        ret += v == v.toLowerCase()? v.toUpperCase() + '_': v;
    });

    return ret.split('').slice(0, -1).join('');
}
exports.toEnvVar = annotate('toEnvVar', 'Converts foobar to FOO_BAR')
    .on(is.string, toEnvVar)
    .satisfies(is.string);
