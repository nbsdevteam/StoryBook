import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  it("renders trigger labels", () => {
    render(
      <Accordion
        config={{
          items: [
            { id: "a", trigger: { label: "Item A" }, content: "A content" },
          ],
        }}
      />
    );

    expect(screen.getByText("Item A")).toBeInTheDocument();
  });
});
