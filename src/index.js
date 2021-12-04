
const SourceNode = require('source-map').SourceNode,
  SourceMapConsumer = require('source-map').SourceMapConsumer,
  generateImport = require('./imports');

module.exports = injectImports;

const HEADER = '/*** IMPORTS FROM inject-imports-loader ***/\n';

/**
 * Webpack loader that appends import statements to
 * the content of loaded files.
 * @param {string} content - Source code of the processed file.
 * @param {*} map - Source map of the processed file.
 * @this {webpack.loader.LoaderContext}
 */
function injectImports(content, map) {
  const done = this.async();
  const options = this.getOptions();
  const imports = Object
    .keys(options)
    .map(
      (key) => generateImport(
        JSON.stringify(
          this.utils.contextify(this.context, key)
        ),
        options[key]
      )
    );

  const prefix = HEADER + imports.join('\n') + '\n\n';

  if (map) {
    SourceMapConsumer.with(map, null, (consumer) => {
      const node = SourceNode.fromStringWithSourceMap(content, consumer);
      node.prepend(prefix);
      const result = node.toStringWithSourceMap({
        file: this.currentRequest
      });
      done(null, result.code, result.map.toJSON());
    })
  } else {
    done(null, prefix + content);
  }
}
