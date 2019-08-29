
const utils = require('loader-utils'),
      SourceNode = require('source-map').SourceNode,
      SourceMapConsumer = require('source-map').SourceMapConsumer;

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
      (key) => generateImport(key, options[key])
    );

  const prefix = HEADER + imports.join('\n') + '\n\n';

  if(map) {
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

/**
 * Generate an import statement that imports 
 * properties form a package with given name.
 * @param {string} pkgName - Name of the package.
 * @param {boolean|string|string[]} property 
 */
function generateImport(pkgName, property) {
  const name = utils.stringifyRequest(pkgName);

  if (property === true) {
    return `import '${name}';`;
  } else if (typeof property === 'string') {
    return `import ${namedImport(property)} from '${name}';`;
  } else if (Array.isArray(property)) {
    return `import { ${property.map(namedImport).join(', ')} } from '${name}';`;
  }
}

/**
 * Optionally names/aliases an imported property.
 * @param {string} property - The property.
 * @returns {string} `property` or `< part before ~ > as < part after ~ >`
 *  if `property` contains the character `~`.
 */
function namedImport(property) {
  const parts = property.split('~', 1);
  if (parts.length === 1) {
    return parts[0];
  } else {
    return `${parts[0]} as ${parts[1]}`;
  }
}