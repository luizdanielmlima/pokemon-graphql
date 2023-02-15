import React from "react";
import { render, screen } from "@testing-library/react";

import OrderByForm from "./OrderByForm";

describe("Order By Form component test", () => {
  it("should render the order by form", () => {
    render(<OrderByForm />);
    const formEl = screen.getByTestId("orderby-form");
    expect(formEl).toBeInTheDocument();
  });

  it("should render 3 options on the select element", async () => {
    render(<OrderByForm />);
    const selectOptionElements = await screen.findAllByRole("option");
    expect(selectOptionElements.length).toBe(3);
  });
});
