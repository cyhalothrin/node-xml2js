class Handler {
  constructor(callback, options) {
    this.callback = callback;
    this.obj = {};
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
    if (this.options.normalizeWhitespace) {
      this.last()._ = text.replace(/\s+/g, ' ').trim();
    } else {
      this.last()._ = text;
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
