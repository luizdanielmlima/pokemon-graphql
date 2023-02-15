import React from "react";
import { render, screen } from "@testing-library/react";
import Pokemons from "./Pokemons";
import { BrowserRouter } from "react-router-dom";

const MockPokemons = () => {
  return (
    <BrowserRouter>
      <Pokemons />
    </BrowserRouter>
  );
};

describe("Pokemons (Home) page test", () => {
  it("should render the loading feedback", () => {
    render(<MockPokemons />);
    const loadingDivEl = screen.getByTestId("loading-container");
    expect(loadingDivEl).toBeInTheDocument();
  });

  it("should render the Settigs bar (search and filter forms)", async () => {
    render(<MockPokemons />);
    const settingsBarEl = await screen.findByTestId("settings-bar");
    expect(settingsBarEl).toBeInTheDocument();
  });
});
