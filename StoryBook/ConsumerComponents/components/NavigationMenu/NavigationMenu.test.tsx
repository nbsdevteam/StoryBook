import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavigationMenu } from "./NavigationMenu";

describe("NavigationMenu", () => {
  it("renders items", () => {
    render(
      <NavigationMenu
        config={{
          items: [
            { id: "home", label: "Home" },
            { id: "settings", label: "Settings" },
          ],
        }}
      />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});
