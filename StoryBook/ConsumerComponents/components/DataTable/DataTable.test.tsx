import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataTable } from "./DataTable";

describe("DataTable", () => {
  it("renders config-driven columns", () => {
    render(
      <DataTable
        config={{
          columns: [{ id: "name", label: "Name", accessor: "name" }],
          data: [{ id: "1", name: "Alex" }],
        }}
      />
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});
