[![build status](https://secure.travis-ci.org/bebraw/parse-env.png)](http://travis-ci.org/bebraw/parse-env)
# parse-env - Parses configuration from env

`parse-env` makes it easy to make your project support environment variable based configuration. It infers the environment variable names based on the given template. That template may be the configuration itself. Should an environment variable matching to the convention be found, it will use that rather than the one in the original configuration.

To make the way it works clearer, consider the example below. It consists of three files. The first one is a template which you would store at your repository. The second one is a private configuration not stored for security reasons. The third one deals with parsing. The files are inside a `config` package. The last file works as an entry point to it.

config/config.template.js:

```js
module.exports = {
    port: 8000,
    aws: {
        accessKeyId: 'replacethis',
        secretAccessKey: 'replacethis'
    }
};
```

config/config.js:

```js
module.exports = {
    port: 80,
    aws: {
        accessKeyId: 'actualid',
        secretAccessKey: 'actualkey'
    }
};
```

config/index.js:

```js
var parseEnv = require('parse-env');

var tpl = require('./config.template');

// the configuration file is optional and doesn't have to exist
var conf;

try {
    conf = require('./config');
}
catch(e) {}


module.exports = parseEnv(process.env, tpl, conf);
```

The parser is convention based. It performs the following conversions:

* parseJSON -> PARSE_JSON
* port -> PORT
* aws.accessKeyId -> AWS_ACCESS_KEY_ID
* foo.bar.baz.gaz -> FOO_BAR_BAZ_GAZ (recursive definition)

In case no match is found either in the environment or configuration, it will just skip the value. If you want to enable warnings, set `VERBOSE_PARSE_ENV` as a truish value.

## License

`parse-env` is available under MIT. See LICENSE for more details.
