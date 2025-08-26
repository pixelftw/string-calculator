import { describe, expect, it } from "vitest";
import { stringCalculator } from "./stringCalculator";

describe("String calculator utility", () => {
  it("returns 0 when an empty string is provided", () => {
    const output = stringCalculator("");
    expect(output).toBe(0);
  });

  it("returns the number itself when a single number is provided", () => {
    const output = stringCalculator("5");
    expect(output).toBe(5);
  });

  it("ignores surrounding whitespace for a single number", () => {
    const output = stringCalculator(" 5 ");
    expect(output).toBe(5);
  });

  it("adds two numbers separated by a comma", () => {
    const output = stringCalculator("4,5");
    expect(output).toBe(9);
  });

  it("ignores whitespace when adding comma-separated numbers", () => {
    const output = stringCalculator(" 5 , 4");
    expect(output).toBe(9);
  });

  it("handles new line characters as valid delimiters", () => {
    const output = stringCalculator("4,5\n,6");
    expect(output).toBe(15);
  });

  it("supports custom delimiters defined with the // syntax", () => {
    const output = stringCalculator("//;\n1;2;4;\n2");
    expect(output).toBe(9);
  });

  it("multiplies all the numbers in case delimeter is '*'", () => {
    expect(stringCalculator("//*\n2*3")).toBe(6);
  });

  it("throws an error when a negative number is provided", () => {
    expect(() => stringCalculator("1,-3")).toThrow(
      "Negative numbers not allowed: -3"
    );
  });

  it("throws an error listing all negative numbers when multiple are provided", () => {
    expect(() => stringCalculator("1,-3,-4")).toThrow(
      "Negative numbers not allowed: -3,-4"
    );
  });
});
