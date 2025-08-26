import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useStringCalculator } from "./useStringCalculator";

describe("useStringCalculator", () => {
  it("initializes with default values (empty input, no result, no error)", () => {
    const { result } = renderHook(() => useStringCalculator(""));

    expect(result.current.input).toBe("");
    expect(result.current.error).toBeNull();
    expect(result.current.result).toBeNull();
  });

  it("calculates the sum of comma-separated numbers", () => {
    const { result } = renderHook(() => useStringCalculator("4,5"));

    act(() => {
      result.current.calculateResult();
    });

    expect(result.current.result).toBe(9);
    expect(result.current.error).toBeNull();
  });

  it("returns an error when negative numbers are provided", () => {
    const { result } = renderHook(() => useStringCalculator("4,-5,-6"));

    act(() => {
      result.current.calculateResult();
    });

    expect(result.current.error).toBe("Negative numbers not allowed: -5,-6");
  });

  it("updates the input value via handleInputChange and recalculates correctly", () => {
    const { result } = renderHook(() => useStringCalculator("4"));

    act(() => {
      result.current.handleInputChange("4,5");
    });

    act(() => {
      result.current.calculateResult();
    });

    expect(result.current.result).toBe(9);
  });

  it("clears the previous result and error when input value changes", () => {
    const { result } = renderHook(() => useStringCalculator("4,-5"));

    act(() => {
      result.current.calculateResult();
    });

    act(() => {
      result.current.handleInputChange("5,6");
    });

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
