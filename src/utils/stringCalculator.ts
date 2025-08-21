const COMMA_AND_NEW_LINE: RegExp = /[,|\n]+/;
const DELEMETER_PREFIX: string = "//";

function addNumbers(string: string, delimiter: RegExp) {
  const numbers = string.trim().split(delimiter);
  const negativeNumbers: number[] = [];

  const result = numbers.reduce((acc, curr) => {
    const number = Number(curr.trim());

    if (number < 0) negativeNumbers.push(number);

    if (isNaN(number)) {
      return acc;
    }

    return acc + number;
  }, 0);

  if (negativeNumbers.length) {
    throw new Error(
      `Negative numbers not allowed ${negativeNumbers.join(",")}`
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

  if (value.startsWith(DELEMETER_PREFIX)) {
    const delimiterEndIndex = value.indexOf("\n");

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
    return Number(stringValue) || 0;
  }

  const { delimiter, parsedValue } = parseDelimiter(stringValue);

  return addNumbers(parsedValue, delimiter);
}
