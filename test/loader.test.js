const compile = require('./compiler');

describe('inject-imports-loader', () => {
  it('should be truthful to the README example', async () => {
    const stats = await compile('res/file.js', {
      'angular-mocks': true,
      'angular': 'angular',
      'lodash': ['reduce', 'transform~tf'],
    });
    const output = stats.toJson({ source: true }).modules[0].source;

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