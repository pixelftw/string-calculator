import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect, it } from "vitest";

describe("App Component", () => {
  it("Should render hello World! text inside h1 tag", () => {
    render(<App />);
    const hellowWorldText = screen.getByRole("heading", {
      level: 1,
      name: "Hello World!",
    });

    expect(hellowWorldText).toBeInTheDocument();
  });
});
