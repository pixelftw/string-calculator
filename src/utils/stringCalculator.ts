const COMMA_AND_NEW_LINE: RegExp = /[,|\n]+/;
const DELEMETER_PREFIX: string = "//";


type OPERATION = 'add' | 'multiply';

function calculateNumber(string: string, delimiter: RegExp, operation: OPERATION) {
  const numbers = string.trim().split(delimiter);
  const negativeNumbers: number[] = [];

  const result = numbers.reduce((acc, curr) => {
    const number = Number(curr.trim());

    if (number < 0) negativeNumbers.push(number);

    if (isNaN(number)) {
      return acc;
    }

    if (operation === 'multiply') {
      return acc * number
    }

    return acc! + number;

  }, operation === 'multiply' ? 1 : 0);

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
  opration: OPERATION
}

function parseDelimiter(value: string): ParsedDelimiter {
  let delimiter = COMMA_AND_NEW_LINE;
  let parsedValue = value;
  let opration: ParsedDelimiter['opration'] = 'add';

  if (value.startsWith(DELEMETER_PREFIX)) {
    const delimiterEndIndex = value.indexOf("\n");

    const delimeterString = value.substring(2, delimiterEndIndex)

    if (delimeterString === '*') {
      delimiter = /\*/;
      opration = 'multiply';

    } else {
      delimiter = new RegExp(delimeterString);

    }

    parsedValue = value.substring(delimiterEndIndex + 1);
  }

  return {
    delimiter,
    parsedValue,
    opration
  };
}

export function stringCalculator(stringValue: string) {
  if (!stringValue || stringValue.trim() === "") {
    return 0;
  }

  if (stringValue.length === 1) {
    return Number(stringValue) || 0;
  }

  const { delimiter, parsedValue, opration } = parseDelimiter(stringValue);

  return calculateNumber(parsedValue, delimiter, opration);
}
