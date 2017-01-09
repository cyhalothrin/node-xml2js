const htmlparser = require('htmlparser2');
const Collector = require('./Collector');

function isStream(stream) {
  return stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';
}

module.exports = function parse(source, fn) {
  const options = { xmlMode: true };
  const collector = new Collector();
  const parser = new htmlparser.Parser({
    onopentag(name) {
      collector.open(name);
    },
    ontext(text) {
      collector.text(text);
    },
    onclosetag(name) {
      collector.close(name);
    },
    onend() {
      fn(collector.obj);
    },
  }, options);

  if (typeof source === 'string') {
    parser.write(source);
    parser.end();
  } else if (isStream(source)) {
    source.pipe(parser);
  } else {
    throw new Error('Source should be Readable stream or String');
  }
};
