import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders label when enabled", () => {
    render(<Progress value={50} max={100} showLabel />);
    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});
