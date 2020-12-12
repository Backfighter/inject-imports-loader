const compile = require('./compiler'),
  webpack = require('webpack');

function get_source(stats) {
  if (webpack.version.startsWith("4")) {
    return stats.toJson().modules[1].modules[0].source;
  } else {
    return stats.toJson({ source: true }).modules[0].source;
  }
}

describe('inject-imports-loader', () => {
  it('should be truthful to the README example', async () => {
    const stats = await compile('res/file.js', {
      'angular-mocks': true,
      'angular': 'angular',
      'lodash': ['reduce', 'transform~tf'],
    });
    const output = get_source(stats);

    expect(output).toBe(
      '/*** IMPORTS FROM inject-imports-loader ***/\n' +
      'import "angular-mocks";\n' +
      'import angular from "angular";\n' +
      'import { reduce, transform as tf } from "lodash";\n' +
      '\n' +
      '// ... (content of file.js)'
    )
  });
});