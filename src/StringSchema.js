import Schema from "./Schema.js"
class StringSchema extends Schema {
  // Source - https://stackoverflow.com/a/46181
  static EMAIL_REGEXEP =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  static DEFAULT_RULE = v => typeof v === "string";

  constructor() {
    super();
    this._addRule(StringSchema.DEFAULT_RULE, "value must be string");
  }

  min(n, message) {
    return this._addRule(v => v.length >= n, message);
  }

  max(n, message) {
    return this._addRule(v => v.length <= n, message);
  }

  matches(regexep, message) {
    return this._addRule(v => regexep.test(v), message);
  }

  email(message) {
    return this._addRule(v => StringSchema.EMAIL_REGEXEP.test(v), message);
  }

  trim() {
    return this._addRule(v => v = v.trim())
  }
}

export default function string() {
  return new StringSchema();
}
