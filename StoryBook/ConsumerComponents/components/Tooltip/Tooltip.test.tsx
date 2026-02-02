import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders content", () => {
    render(
      <Tooltip content="Tip">
        <span>Hover</span>
      </Tooltip>
    );
    expect(screen.getByText("Tip")).toBeInTheDocument();
  });
});
