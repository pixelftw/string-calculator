import { useState } from "react";
import { add } from "../utils/stringCalculator";

interface StringCalculatorHookReturn {
  input: string;
  result: number | null;
  error: string | null;
  calculateResult: () => void;
  handleInputChange: (value: string) => void;
}

export function useStringCalculator(
  initialValue: string
): StringCalculatorHookReturn {
  const [input, setInput] = useState<string>(initialValue);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculateResult() {
    try {
      const result = add(input);
      setResult(result);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
    }
  }

  function handleInputChange(value: string) {
    setResult(null);
    setError(null);
    setInput(value);
  }

  return {
    input,
    result,
    error,
    calculateResult,
    handleInputChange,
  };
}
