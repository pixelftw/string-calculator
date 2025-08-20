const COMMA_AND_NEW_LINE: RegExp = /[,\n]+/;

function addNumbers(string: string, delimiter: RegExp) {
  const numbers = string.trim().split(delimiter);
  const negativeNumbers: number[] = [];

  const result = numbers.reduce((acc, curr) => {
    const number = Number(curr);

    if (number < 0) negativeNumbers.push(number);

    return acc + Number(number);
  }, 0);

  if (negativeNumbers.length) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(",")}`
    );
  }

  return result;
}

interface ParsedDelimiter {
  parsedValue: string;
  delimiter: RegExp;
}

function parseDelimiter(value: string): ParsedDelimiter {
  let delimiter = COMMA_AND_NEW_LINE;
  let parsedValue = value;
  const delimiterEndIndex = value.indexOf("\n");

  if (value.startsWith("//")) {
    delimiter = new RegExp(value.substring(2, delimiterEndIndex));
    parsedValue = value.substring(delimiterEndIndex + 1);
  }

  return {
    delimiter,
    parsedValue,
  };
}

export function add(stringValue: string) {
  if (!stringValue || stringValue.trim() === "") {
    return 0;
  }

  if (stringValue.length === 1) {
    return Number(stringValue);
  }

  const { delimiter, parsedValue } = parseDelimiter(stringValue);

  return addNumbers(parsedValue, delimiter);
}
