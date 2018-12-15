const fs = require('fs');

module.exports = {
  process(src, filename) {
    const source = fs.readFileSync(filename, 'utf8');
    return `module.exports = ${JSON.stringify(source)};`;
  }
};
