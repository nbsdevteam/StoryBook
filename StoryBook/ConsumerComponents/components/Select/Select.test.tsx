import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Select } from "./Select";

describe("Select", () => {
  it("renders config-driven placeholder", () => {
    render(
      <Select
        config={{
          options: [{ label: "Option", value: "1" }],
          placeholder: "Pick one",
        }}
      />
    );
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });
});
