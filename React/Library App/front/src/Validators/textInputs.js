//Validator
export const validate = (value, input, errors, rules) => {
  for (let i = 0; i < rules.length; i++) {
    let result;
    if (!Array.isArray(rules[i])) {
      result = rules[i](value);
    } else {
      result = rules[i][0](value, rules[i][1]);
    }

    if (result === 1) {
      return true;
    }
    if (result === 0) {
      continue;
    }

    if (result !== true) {
      errors.set(input, input + ": " + result);
      return false;
    }
  }
  return true;
};
//Rules//
//Sometimes
export const sometimes = (value) => {
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "object"
  ) {
    return 0;
  }

  if (value) {
    return 0;
  }
  return 1;
};
//Required
export const required = (value) => {
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "object"
  ) {
    return true;
  }
  if (value) {
    return true;
  }

  return "Required";
};
//Min
export const min = (value, min) => {
  if (typeof value === "number") {
    if (value >= min) {
      return true;
    }
    return "Too small minimum " + min;
  }
  if (value.length >= min) {
    return true;
  }
  return "too short mininmum " + min + " characters";
};

//Max
export const max = (value, max) => {
  if (typeof value === "number") {
    if (value <= max) return true;
  }
  if (value.length <= max) {
    return true;
  }
  return "too long " + max + " characters";
};
//String
export const string = (value) => {
  if (typeof value === "string") {
    return true;
  }
  return "Not a string";
};
//Integer
export const integer = (value) => {
  const n = Number(value);
  if (isNaN(n)) {
    return "Not a number";
  }
  if (n === parseInt(n, 10)) {
    return true;
  }
  return "Not an integer";
};

//Number
export const number = (value) => {
  if (typeof value === "number") {
    return true;
  }
  return "Not a number";
};

//lettersOnly
export const lettersOnly = (value) => {
  if (value.match(/^[a-zA-Z]+$/)) {
    return true;
  }
  return "only letters";
};
//Date
export const date = (value) => {
  const d = new Date(value);

  if (d instanceof Date && !isNaN(d)) {
    return true;
  }

  return "Invalid date format";
};
//inNumbers
export const inNumbers = (value, numbers) => {
  if (numbers.includes(+value)) {
    return true;
  }
  return "Invalid value";
};
//Image type
export const imageType = (value, types) => {
  if (types.includes(value.type.split("/").pop())) {
    return true;
  }
  return "Invalid image type or not an image";
};
//Image size
export const imageSize = (value, size) => {
  if (value.size <= size) {
    return true;
  }
  return "Image is too big. Maximum size is " + size / 100000 + "MB";
};
