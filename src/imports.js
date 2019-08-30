module.exports = generateImport;

/**
 * Generate an import statement that imports 
 * properties form a package with given name.
 * @param {string} pkgName - Name of the package.
 * @param {boolean|string|string[]} property - 
 * Property/properties to import.
 */
function generateImport(pkgName, property) {
  if (property === true) {
    return `import '${pkgName}';`;
  } else if (typeof property === 'string') {
    return `import ${namedImport(property)} from '${pkgName}';`;
  } else if (Array.isArray(property)) {
    return `import { ${property.map(namedImport).join(', ')} } from '${pkgName}';`;
  }
}

/**
 * Optionally names/aliases an imported property.
 * @param {string} property - The property.
 * @returns {string} `property` or `< part before ~ > as < part after ~ >`
 *  if `property` contains the character `~`.
 */
function namedImport(property) {
  const parts = property.split('~', 2);
  if (parts.length === 1) {
    return parts[0];
  } else {
    return `${parts[0]} as ${parts[1]}`;
  }
}