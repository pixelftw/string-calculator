// Constants
const DEFAULT_DELIMITER = /[,\n]+/;
const DELIMITER_PREFIX = "//";

// Types
type Operation = "add" | "multiply";

interface CalculatorConfig {
  numbers: string;
  delimiter: RegExp;
  operation: Operation;
  shouldAddOnlyOddNumbers?: boolean;
}

function validateNumbers(numbers: number[]): void {
  const negativeNumbers = numbers.filter((num) => num < 0);

  if (negativeNumbers.length > 0) {
    throw new Error(
      `Negative numbers not allowed: ${negativeNumbers.join(",")}`
    );
  }
}

function parseNumbers(input: string, delimiter: RegExp): number[] {
  return input
    .trim()
    .split(delimiter)
    .map((str) => Number(str.trim()))
    .filter((num) => !isNaN(num));
}

function addNumers(
  currentResult: number,
  numberToAdd: number,
  shouldAddOnlyOddNumbers: CalculatorConfig["shouldAddOnlyOddNumbers"]
) {
  if (shouldAddOnlyOddNumbers) {
    // add only odd numbers
    if (numberToAdd % 2 === 0) {
      return currentResult;
    }
  }

  return currentResult + numberToAdd;
}

function multiplyNumber(num1: number, num2: number) {
  return num1 * num2;
}

function performOperation(
  numbers: number[],
  operation: Operation,
  shouldAddOnlyOddNumbers: CalculatorConfig["shouldAddOnlyOddNumbers"] = false
): number {
  const shouldDoMultipleOperation = operation === "multiply";
  const initialValue = shouldDoMultipleOperation ? 1 : 0;

  const result = numbers.reduce((result, current) => {
    if (operation === "add") {
      return addNumers(result, current, shouldAddOnlyOddNumbers);
    }

    if (operation === "multiply") {
      return multiplyNumber(result, current);
    }

    return 0;
  }, initialValue);

  return result;
}

function parseDelimiterConfig(input: string): CalculatorConfig {
  // Handle empty or single character input
  if (!input?.trim()) {
    return { numbers: "", delimiter: DEFAULT_DELIMITER, operation: "add" };
  }

  // Check for custom delimiter
  if (!input.startsWith(DELIMITER_PREFIX)) {
    return { numbers: input, delimiter: DEFAULT_DELIMITER, operation: "add" };
  }

  const newlineIndex = input.indexOf("\n");

  if (newlineIndex === -1) {
    return { numbers: input, delimiter: DEFAULT_DELIMITER, operation: "add" };
  }

  const delimiterString = input.substring(
    DELIMITER_PREFIX.length,
    newlineIndex
  );

  const numbersString = input.substring(newlineIndex + 1);

  // Special case for multiplication
  if (delimiterString === "*") {
    return {
      numbers: numbersString,
      delimiter: /\*/,
      operation: "multiply",
    };
  }

  if (delimiterString === "o") {
    return {
      numbers: numbersString,
      delimiter: /o/,
      operation: "add",
      shouldAddOnlyOddNumbers: true,
    };
  }

  return {
    numbers: numbersString,
    delimiter: new RegExp(delimiterString),
    operation: "add",
  };
}

export function stringCalculator(input: string): number {
  const config = parseDelimiterConfig(input);

  if (!config.numbers.trim()) {
    return 0;
  }

  const numbers = parseNumbers(config.numbers, config.delimiter);

  validateNumbers(numbers);

  return performOperation(
    numbers,
    config.operation,
    config.shouldAddOnlyOddNumbers
  );
}
