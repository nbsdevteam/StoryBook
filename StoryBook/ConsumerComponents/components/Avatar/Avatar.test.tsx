import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders fallback", () => {
    render(<Avatar fallback="AB" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });
});
