import Schema from "./Schema.js"

class NumberSchema extends Schema {
  static DEFAULT_RULE = v => typeof v === "number";
  constructor() {
    super();
    this._addRule(NumberSchema.DEFAULT_RULE, "value must be number");
  }

  min(n) {
    return this._addRule(value => value >= n);
  }
  max(n) {
    return this._addRule(value => value <= n);
  }
  
  integer() {
    return this._addRule(value => Number.isInteger(value));
  }

  positive() {
    return this._addRule(value => value > 0);
  }
}

export default function number() {
  return new NumberSchema();
}
