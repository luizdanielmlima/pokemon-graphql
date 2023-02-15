import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RootPage from "./Root";

const MockRoot = () => {
  return (
    <BrowserRouter>
      <RootPage />
    </BrowserRouter>
  );
};

test("Root page test", () => {
  render(<MockRoot />);

  // Test the main logo img
  const logoElement = screen.getByTestId("headerLogo");
  expect(logoElement).toBeInTheDocument();
  expect(logoElement).toHaveAttribute("alt");
  expect(logoElement).toHaveAttribute("src");

  // Test Link to Author page in the Footer
  const linkToAuthorPageElement = screen.getByTestId("authorPageLink");
  expect(linkToAuthorPageElement).toBeInTheDocument();
  expect(linkToAuthorPageElement).toHaveAccessibleDescription();
});
