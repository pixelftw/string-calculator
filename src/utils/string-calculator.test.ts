import { describe, expect, it } from "vitest";
import { add } from "./string-calculator";

describe("String calculator utility", () => {
  it("should return 0 if empty string is passed to it", () => {
    const output = add("");

    expect(output).toBe(0);
  });

  it("should return the number itself", () => {
    const output = add("5");

    expect(output).toBe(5);
  });

  it("should ignore whitespace and return the number", () => {
    const output = add(" 5 ");

    expect(output).toBe(5);
  });

  it("should add two comma separated numbers", () => {
    const output = add("4,5");

    expect(output).toBe(9);
  });

  it("should ignore whitespace and still perform comma separated sum", () => {
    const output = add(" 5 , 4");

    expect(output).toBe(9);
  });

  it("should handle new lines", () => {
    const output = add("4,5\n,6");
    expect(output).toBe(15);
  });

  it("should support different delimiters", () => {
    const output = add("//;\n1;2;4;\n2");

    expect(output).toBe(9);
  });

  it("should throw negative numbers", () => {
    expect(() => add("1,-3")).toThrow("negative numbers not allowed -3");
  });

  it("should throw and show error message with multiple negative numbers", () => {
    expect(() => add("1,-3,-4")).toThrow("negative numbers not allowed -3,-4");
  });
});
