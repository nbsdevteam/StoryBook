import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders config-driven content", () => {
    render(
      <Card
        config={{
          header: { title: "Title" },
          content: "Content",
        }}
      />
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
