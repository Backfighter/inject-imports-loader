
const utils = require('loader-utils'),
  SourceNode = require('source-map').SourceNode,
  SourceMapConsumer = require('source-map').SourceMapConsumer,
  generateImport = require('./imports');

module.exports = injectImports;

const HEADER = '/*** IMPORTS FROM inject-imports-loader ***/\n';

/**
 * Webpack loader that appends import statements to
 * the content of loaded files.
 * @param {string} content - Source code of the processed file.
 * @param {*} map - Source map of the processed file.
 */
function injectImports(content, map) {
  const done = this.async();
  const options = utils.getOptions(this);
  const imports = Object
    .keys(options)
    .map(
      (key) => generateImport(
        utils.stringifyRequest(this, key),
        options[key]
      )
    );

  const prefix = HEADER + imports.join('\n') + '\n\n';

  if (map) {
    SourceMapConsumer.with(map, (consumer) => {
      const node = SourceNode.fromStringWithSourceMap(content, consumer);
      node.prepend(prefix);
      const result = node.toStringWithSourceMap({
        file: utils.getCurrentRequest(this)
      });
      done(null, result.code, result.map.toJSON());
    })
  } else {
    done(null, prefix + content);
  }
}