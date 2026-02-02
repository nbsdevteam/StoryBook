import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Form } from "./Form";

describe("Form", () => {
  it("renders fields", () => {
    render(
      <Form
        config={{
          fields: [{ name: "name", label: "Name", type: "text" }],
          onSubmit: () => undefined,
        }}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});
