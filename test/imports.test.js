const generateImport = require('../src/imports');

describe('generateImport', () => {
  it('should map true to an unnamed import', () => {
    expect(generateImport('pkg', true))
      .toBe('import \'pkg\';');
  });

  it('should map a string to a default import', () => {
    expect(generateImport('pkg', 'name'))
      .toBe('import name from \'pkg\';');
  });

  it('should not interpret ~ for a default import', () => {
    expect(generateImport('pkg', 'name~alias'))
      .toBe('import name~alias from \'pkg\';');
  });

  it('should map a string array to multi import', () => {
    expect(generateImport('pkg', ['prop1', 'prop2', 'prop3']))
      .toBe('import { prop1, prop2, prop3 } from \'pkg\';');
  });

  it('should map a string array with ~ correctly', () => {
    expect(
      generateImport(
        'pkg', ['prop1~alias1', 'prop2', 'prop3~alias3']
      )
    ).toBe(
      'import { prop1 as alias1, prop2, prop3 as alias3 } from \'pkg\';'
    );
  });

  it('should work with already quoted strings', () => {
    expect(generateImport('"pkg"', true))
      .toBe('import "pkg";');
    expect(generateImport('\'pkg\'', true))
      .toBe('import \'pkg\';');
  });
});