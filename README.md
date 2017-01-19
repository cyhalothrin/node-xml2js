# node-xml2js
This package converts xml string or stream to js object.

#Usage
```js
const parse = require('node-xml2js');

const xml = '<tag attr="value">Hello, world!</tag>'; 

parse(xml, (obj) => {
  console.log(obj);
});

// prints
// { tag: { $: { attr: 'value' }, _: 'Hello, world!' }}
```
