import React from "react";
import { render, screen } from "@testing-library/react";
import QueryBar from "./QueryBar";

describe("Querybar component test", () => {
  it("should render the query/search limit form", () => {
    render(<QueryBar />);
    const queryFormEl = screen.getByTestId("query-form");
    expect(queryFormEl).toBeInTheDocument();
  });

  it("should render the input field", () => {
    render(<QueryBar />);
    const inputEl = screen.getByTestId("query-form-input");
    expect(inputEl).toBeInTheDocument();
  });

  it("should render the reload button", () => {
    render(<QueryBar />);
    const reloadButtonEl = screen.getByTestId("query-form-reload-btn");
    expect(reloadButtonEl).toBeInTheDocument();
  });
});
