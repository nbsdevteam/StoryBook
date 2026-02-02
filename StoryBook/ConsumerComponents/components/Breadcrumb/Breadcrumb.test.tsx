import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders items", () => {
    render(
      <Breadcrumb
        config={{
          items: [
            { label: "Home" },
            { label: "Products" },
          ],
        }}
      />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });
});
