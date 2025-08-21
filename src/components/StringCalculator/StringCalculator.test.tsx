import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { StringCalculator } from "./StringCalculator";

describe("StringCalculator", () => {
  beforeEach(() => {
    render(<StringCalculator />);
  });

  it("renders app title as String Calculator inside h1 tag", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: /String Calculator/ })
    ).toBeInTheDocument();
  });

  it("submits the input and renders the result when click on the button", () => {
    const textarea = screen.getByLabelText(/String/i);
    fireEvent.change(textarea, { target: { value: "1,2,3" } });

    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(screen.getByText(/result:/i)).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("displays the error in case of negative number", () => {
    const textarea = screen.getByLabelText(/String/i);
    fireEvent.change(textarea, { target: { value: "1,-2,3" } });

    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      screen.getByText(/negative numbers not allowed/i)
    ).toBeInTheDocument();
  });

  it("removes the result and error in case user inputs anything new", () => {
    const textarea = screen.getByLabelText(/String/i);
    fireEvent.change(textarea, { target: { value: "1,2" } });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(screen.getByText("3")).toBeInTheDocument();

    // Now input new value
    fireEvent.change(textarea, { target: { value: "2,2" } });

    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(
      screen.queryByText(/negative numbers not allowed/i)
    ).not.toBeInTheDocument();
  });

  it("supports custom delimiter format (//;\\n1;2;3)", () => {
    const textarea = screen.getByLabelText(/String/i);
    fireEvent.change(textarea, { target: { value: "//;\n1;2;3" } });

    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("shows 0 when input is empty string", () => {
    const textarea = screen.getByLabelText(/String/i);
    fireEvent.change(textarea, { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
