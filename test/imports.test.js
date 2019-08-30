const generateImport = require('../src/imports');

describe('generateImport', () => {
  it('should map true to an unnamed import', async () => {
    expect(generateImport('pkg', true))
      .toBe('import \'pkg\';')
  });

  it('should map a string to an named import', async () => {
    expect(generateImport('pkg', 'name'))
      .toBe('import name from \'pkg\';')
  });

  it('should map a string with ~ to an aliased import', async () => {
    expect(generateImport('pkg', 'name~alias'))
      .toBe('import name as alias from \'pkg\';')
  });

  it('should map a string with ~ to an aliased import', async () => {
    expect(generateImport('pkg', 'name~alias'))
      .toBe('import name as alias from \'pkg\';')
  });
});