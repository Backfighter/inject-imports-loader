[![npm][npm]][npm-url]
[![node][node]][node-url]
[![Build & Test](https://github.com/Backfighter/inject-imports-loader/actions/workflows/github-actions-build.yml/badge.svg)](https://github.com/Backfighter/inject-imports-loader/actions/workflows/github-actions-build.yml)

<div align="center">
  <h1>Inject Imports Loader</h1>
  <p>
    Inject dependencies into your files bundled with webpack.
    Useful if you're mirgrating a legacy application that 
    doesn't use imports yet.
  <p>
</div>

<h2 align="center">Install</h2>

```bash
npm i inject-imports-loader --save-dev
```

<h2 align="center">Usage</h2>

### Inline

```js
import 'inject-imports-loader?angular-mocks,lodash[]=reduce,lodash[]=transform~tf!./file.js';
```
Results in:  

**file.js**
```js
/*** IMPORTS FROM inject-imports-loader ***/
import "angular-mocks";
import angular from "angular";
import { reduce, transform as tf } from "lodash";

// ... (content of file.js)
```

### Configuration

**webpack.config.js**
```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /file\.js$/,
        use: {
          loader: 'inject-imports-loader',
          options: {
            'angular-mocks': true,
            'angular': 'angular',
            'lodash': ['reduce', 'transform~tf'],
          }
        }
      }
    ]
  }
  // ...
}
```
Results in:  

**file.js**
```js
/*** IMPORTS FROM inject-imports-loader ***/
import "angular-mocks";
import angular from "angular";
import { reduce, transform as tf } from "lodash";

// ... (content of file.js)
```

## Similar loaders

This loader has similarities to the 
[imports-loader][imports-loader],
but it uses es6 import statements instead of require.
If you want to inject constants or replace `this` with a custom value
you should use the [imports-loader][imports-loader] instead
(Or use both in combination).

[imports-loader]: https://github.com/webpack-contrib/imports-loader

[travis]: https://img.shields.io/travis/Backfighter/inject-imports-loader?style=flat-square
[travis-url]: https://travis-ci.org/Backfighter/inject-imports-loader

[npm]: https://img.shields.io/npm/v/inject-imports-loader.svg?style=flat-square
[npm-url]: https://npmjs.com/package/inject-imports-loader

[node]: https://img.shields.io/node/v/inject-imports-loader.svg?style=flat-square
[node-url]: https://nodejs.org

[deps]: https://img.shields.io/david/Backfighter/inject-imports-loader?style=flat-square
[deps-url]: https://david-dm.org/Backfighter/inject-imports-loader
