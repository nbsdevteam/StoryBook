import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Combobox } from "./Combobox";

describe("Combobox", () => {
  it("renders input", () => {
    render(
      <Combobox
        config={{
          options: [{ label: "Apple", value: "apple" }],
          placeholder: "Select",
        }}
      />
    );

    expect(screen.getByPlaceholderText("Select")).toBeInTheDocument();
  });
});
