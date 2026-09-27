/* Schema is super class for
every validator class
*/

export default class Schema {
  constructor() {
    this._rules = []; // Array of { test, message }
    this._required = false;
  }

  _addRule(test, message) {
    this._rules.push({ test, message });
    return this;
  }

  required(message="This field is required") {
    this._required = true;
    return this._addRule(
      v => v != null && v != "",
      message,
    );
  }

  // Custom user-defined rule
  test(fn, message="Invalid value") {
    return this._addRule(fn, message);
  }

  validate(value) {
    let errors = []
    if (!this._required && value == null) {
      return { valid: true, errors};
    }
    for(let rule of this._rules) {
      if (!rule["test"](value)) {
        errors.push(rule.message);
      }
    }
    return { valid: errors.length === 0, errors};
  }

  validateOrThrow(value) {
    let { valid, errors } = this.validate(value);
    if (!valid) { throw new Error(errors[0]); }
    return value;
  }
}
