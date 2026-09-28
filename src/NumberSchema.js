import Schema from "./Schema.js"

class NumberSchema extends Schema {
  static DEFAULT_RULE = v => typeof v === "number";
  constructor() {
    super();
    this._addRule(NumberSchema.DEFAULT_RULE, "value must be number");
  }

  min(n, message) {
    return this._addRule(value => value >= n, message);
  }
  max(n, message) {
    return this._addRule(value => value <= n, message);
  }
  
  integer(message) {
    return this._addRule(value => Number.isInteger(value), message);
  }

  positive(message) {
    return this._addRule(value => value > 0, message);
  }
}

export default function number() {
  return new NumberSchema();
}
