import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect, it } from "vitest";

describe("App Component", () => {
  it("Should render String calculator component", () => {
    render(<App />);
    const stringCalculatorHeading = screen.getByRole("heading", {
      level: 1,
      name: "String Calculator",
    });

    expect(stringCalculatorHeading).toBeInTheDocument();
  });
});
