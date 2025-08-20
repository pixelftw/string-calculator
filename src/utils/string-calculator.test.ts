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

  it("should add two comma separated numbers", () => {
    const output = add("4,5");

    expect(output).toBe(9);
  });

  it.todo("should handle new lines");

  it.todo("should support different delimiters");

  it.todo("should throw all negative numbers");

  it.todo("should throw and show error message with multiple negative numbers");
});
