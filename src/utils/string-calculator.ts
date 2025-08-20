function addCommaSeperatedNumbersFromString(string: string) {
  const numbers = string.trim().split(",");
  let result = 0;

  numbers.forEach((value) => {
    result = result + Number(value);
  });

  return result;
}

export function add(stringValue: string) {
  if (!stringValue) {
    return 0;
  }

  if (stringValue.indexOf(",")) {
    return addCommaSeperatedNumbersFromString(stringValue);
  }

  return Number(stringValue);
}
