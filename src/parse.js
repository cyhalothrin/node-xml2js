const htmlparser = require('htmlparser2');
const Handler = require('./Handler');

function isStream(stream) {
  return stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';
}

module.exports = function parse(source, options, callback) {
  const parserOptions = { xmlMode: true };
  const handlerOptions = {};
  let handlerCallback;

  if (typeof options === 'function') {
    handlerCallback = options;
  } else if (typeof options === 'object') {
    handlerCallback = callback;
    const handlerOptionsKeys = ['normalizeWhitespace'];
    handlerOptionsKeys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        handlerOptions[key] = options[key];
      } else {
        parserOptions[key] = options[key];
      }
    });
  }

  const handler = new Handler(handlerCallback, handlerOptions);
  const parser = new htmlparser.Parser(handler, parserOptions);

  if (typeof source === 'string') {
    parser.write(source);
    parser.end();
  } else if (isStream(source)) {
    source.pipe(parser);
  } else {
    throw new Error('Source should be Readable stream or String');
  }
};
