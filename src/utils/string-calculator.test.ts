import { describe, expect, it } from "vitest";
import { add } from "./string-calculator";

describe("String calculator utility", () => {
  it("returns 0 when an empty string is provided", () => {
    const output = add("");
    expect(output).toBe(0);
  });

  it("returns the number itself when a single number is provided", () => {
    const output = add("5");
    expect(output).toBe(5);
  });

  it("ignores surrounding whitespace for a single number", () => {
    const output = add(" 5 ");
    expect(output).toBe(5);
  });

  it("adds two numbers separated by a comma", () => {
    const output = add("4,5");
    expect(output).toBe(9);
  });

  it("ignores whitespace when adding comma-separated numbers", () => {
    const output = add(" 5 , 4");
    expect(output).toBe(9);
  });

  it("handles new line characters as valid delimiters", () => {
    const output = add("4,5\n,6");
    expect(output).toBe(15);
  });

  it("supports custom delimiters defined with the // syntax", () => {
    const output = add("//;\n1;2;4;\n2");
    expect(output).toBe(9);
  });

  it("throws an error when a negative number is provided", () => {
    expect(() => add("1,-3")).toThrow("negative numbers not allowed -3");
  });

  it("throws an error listing all negative numbers when multiple are provided", () => {
    expect(() => add("1,-3,-4")).toThrow("negative numbers not allowed -3,-4");
  });
});
