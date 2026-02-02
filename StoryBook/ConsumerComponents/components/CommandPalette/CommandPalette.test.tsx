import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CommandPalette } from "./CommandPalette";

describe("CommandPalette", () => {
  it("renders when open", () => {
    render(
      <CommandPalette
        config={{
          open: true,
          onOpenChange: () => undefined,
          groups: [
            { heading: "Commands", commands: [{ id: "a", label: "A", onSelect: () => undefined }] },
          ],
        }}
      />
    );

    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
