import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("renders when open", () => {
    render(
      <Dialog
        config={{
          open: true,
          onOpenChange: () => undefined,
          title: "Dialog Title",
          description: "Dialog description",
        }}
      />
    );

    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog description")).toBeInTheDocument();
  });
});
