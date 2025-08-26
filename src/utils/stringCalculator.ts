// Constants
const DEFAULT_DELIMITER = /[,\n]+/;
const DELIMITER_PREFIX = "//";

// Types
type Operation = "add" | "multiply";

interface CalculatorConfig {
  numbers: string;
  delimiter: RegExp;
  operation: Operation;
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

function performOperation(numbers: number[], operation: Operation): number {
  const initialValue = operation === "multiply" ? 1 : 0;

  const result = numbers.reduce((result, current) => {
    return operation === "multiply" ? result * current : result + current;
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

  return performOperation(numbers, config.operation);
}
