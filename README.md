# node-xml2js
This package converts xml string or stream to js object. Uses [htmlparser2](https://github.com/fb55/htmlparser2).

# Usage
```js
const parse = require('node-xml2js');

const xml = '<tag attr="value">Hello, world!</tag>';

parse(xml, (err, obj) => {
  console.log(obj);
});

// prints
// { _: '', tag: { '$': { attr: 'value' }, _: 'Hello, world!' } }
```
