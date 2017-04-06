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
  } else if (options !== null && typeof options === 'object') {
    handlerCallback = callback;
    const handlerOptionsKeys = ['normalizeWhitespace'];
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        if (handlerOptionsKeys.indexOf(key) !== -1) {
          handlerOptions[key] = options[key];
        } else {
          parserOptions[key] = options[key];
        }
      }
    }
  } else {
    throw new Error('Second argument should be Object or callable');
  }

  const handler = new Handler(handlerCallback, handlerOptions);

  if (typeof source === 'string') {
    const parser = new htmlparser.Parser(handler, parserOptions);
    parser.write(source);
    parser.end();
  } else if (isStream(source)) {
    const parser = new htmlparser.WritableStream(handler, parserOptions);
    source.pipe(parser);
  } else {
    throw new Error('Source should be Readable stream or String');
  }
};
