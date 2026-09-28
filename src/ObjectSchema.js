import Schema from "./Schema.js";
class ObjectSchema extends Schema {
  constructor(shape) {
    super()
    this.shape = shape;
  }

  validate(obj) {
    let results = { valid: true, errors: {} };
    for (let [propName, validator] of Object.entries(this.shape)) {
      let result = validator.validate(obj[propName]);
      if (!result.valid) {
        results["valid"] = false;
      }
      results["errors"][propName] = result["errors"];
    }

    return results;
  }
}

export default function object(shape) {
  return new ObjectSchema(shape);
}

import string from "./StringSchema.js";
import number from "./NumberSchema.js";

const userSchema = object({
  name: string().required().min(2),
  age: number().required().min(0, "age must be positive"),
  email: string().required().email(),
});

console.log(userSchema.validate({ name: "An", email: "bad@gmail.com" }));
// {
//   valid: false,
//   errors: {
//     age: ["..."],
//     email: ["..."]
//   }
// }
