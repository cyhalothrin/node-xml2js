class Handler {
  constructor(callback, options) {
    this.callback = callback;
    this.obj = { _: '' };
    this.stack = [this.obj];
    const defaultOptions = {
      normalizeWhitespace: true,
    };
    this.options = Object.assign(defaultOptions, options);
  }
  onopentag(name, attrs) {
    const ref = this.last();
    const obj = {
      $: attrs || {},
      _: '',
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
  onclosetag() {
    this.stack.pop();
  }
  ontext(text) {
    const last = this.last();
    if (this.options.normalizeWhitespace) {
      last._ += text.replace(/\s+/g, ' ');
    } else {
      last._ += text;
    }
  }
  onend() {
    this.callback(null, this.obj);
  }
  onerror(err) {
    this.callback(err);
  }
  last() {
    return this.stack[this.stack.length - 1];
  }
}

module.exports = Handler;
