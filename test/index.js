const test = require('tape');
const fs = require('fs');
const parse = require('../index');
const expected = require('./_data/data.json');

test('parse test', (t) => {
  const filename = `${__dirname}/_data/data.xml`;
  const xmlString = fs.readFileSync(filename).toString();
  const options = { decodeEntities: true, normalizeWhitespace: false };
  parse(xmlString, options, (err, res) => {
    t.deepEquals(res, expected);
  });

  const xmlStream = fs.createReadStream(filename);
  parse(xmlStream, options, (err, res) => {
    t.deepEquals(res, expected);
    t.end();
  });
});
