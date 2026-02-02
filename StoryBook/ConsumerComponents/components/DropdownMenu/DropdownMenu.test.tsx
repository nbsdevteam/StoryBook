import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DropdownMenu } from "./DropdownMenu";

describe("DropdownMenu", () => {
  it("renders trigger label", () => {
    render(
      <DropdownMenu
        config={{
          trigger: { label: "Actions" },
          items: [{ type: "item", label: "Item 1" }],
        }}
      />
    );

    expect(screen.getByText("Actions")).toBeInTheDocument();
  });
});
