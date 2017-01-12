class Collector {
  constructor(options = {}) {
    this.charKey = options.charKey || '_';
    this.reset();
  }
  reset() {
    this.obj = {};
    this.stack = [this.obj];
    this.isEnd = false;
  }
  open(name, attrs) {
    const ref = this.last();
    const obj = {
      $: attrs || {},
      [this.charKey]: '',
    };
    if (ref[name]) {
      if (!Array.isArray(ref[name])) {
        ref[name] = [ref[name]];
      }
      ref[name].push(obj);
    } else {
      ref[name] = obj;
    }
    this.stack.push(obj);
  }
  close() {
    this.stack.pop();
    if (!this.stack.length) {
      this.stack.length = 0;
      this.isEnd = true;
    }
  }
  text(text) {
    // text = text.replace(/(\\r|\\n|\\t)/, '');
    // text = text.trim();

    // if (text.length) {
    this.last()[this.charKey] = text;
    // }
  }
  last() {
    return this.stack[this.stack.length - 1];
  }
}

module.exports = Collector;
