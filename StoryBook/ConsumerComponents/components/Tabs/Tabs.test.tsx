import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
  it("renders tab labels", () => {
    render(
      <Tabs
        config={{
          tabs: [
            { id: "one", label: "One", content: "One content" },
            { id: "two", label: "Two", content: "Two content" },
          ],
        }}
      />
    );

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});
