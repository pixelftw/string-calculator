import type { ChangeEvent } from "react";
import { useStringCalculator } from "../../hooks";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { TextArea } from "../ui/TextArea";

export function StringCalculator() {
  const { input, result, error, handleInputChange, calculateResult } =
    useStringCalculator("");

  function handleTextAreaInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    handleInputChange(e.target.value);
  }

  return (
    <Card>
      <div className="flex items-center gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            String Calculator
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter numbers separated by commas or new lines
          </p>
        </div>
      </div>

      <div className="space-y-6 text-start">
        <TextArea
          id="numbers"
          value={input}
          onChange={handleTextAreaInputChange}
          label="String"
          placeholder={`Enter numbers (comma, newline, or custom delimiter)\nExamples:\n1,2,3\n1\n2,3\n//;\n1;2;3`}
        />

        <Button onClick={calculateResult} className="w-full">
          Calculate
        </Button>

        {error ? (
          <Alert type="error">
            <span className="text-sm font-medium">{error}</span>
          </Alert>
        ) : null}

        {result !== null && !error ? (
          <Alert type="success">
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium">Result:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {result}
              </span>
            </div>
          </Alert>
        ) : null}
      </div>
    </Card>
  );
}
