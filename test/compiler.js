const path = require('path'),
  webpack = require('webpack'),
  memoryfs = require('memory-fs');

module.exports = compile;

/**
 * @param {string} filePath - Relative path to a file.
 * @returns It's absolute path.
 */
function abs(filePath) {
  return path.resolve(__dirname, filePath)
}

/**
 * Bundles given fixture and applies the inject-imports-loader
 * on it.
 * @param {string} fixture - File to compile using webpack.
 * @param {*} options - Option for the loader.
 * @returns The webpack stats.
 */
function compile(fixture, options = {}) {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    resolve: {
      // mock import targets.
      alias: {
        angular: abs('res/mocks/angular.js'),
        'angular-mocks': abs('res/mocks/angular-mocks.js'),
        lodash: abs('res/mocks/lodash.js'),
      }
    },
    module: {
      rules: [{
        test: /file\.js$/,
        use: {
          loader: abs('../src/index.js'),
          options: options
        },
      }]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

      resolve(stats);
    });
  });
};