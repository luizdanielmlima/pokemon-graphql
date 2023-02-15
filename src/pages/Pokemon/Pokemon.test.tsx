import React from "react";
import { render, screen } from "@testing-library/react";
import Pokemon from "./Pokemon";
import { BrowserRouter } from "react-router-dom";

const MockPokemon = () => {
  return (
    <BrowserRouter>
      <Pokemon />
    </BrowserRouter>
  );
};

describe("Pokemon page test", () => {
  it("should render the loading feedback", () => {
    render(<MockPokemon />);
    const loadingDivEl = screen.getByTestId("loading-container");
    expect(loadingDivEl).toBeInTheDocument();
  });

  it("should render the Pokemon content", async () => {
    render(<MockPokemon />);
    const backButtonEl = await screen.findByTestId("back-button");
    expect(backButtonEl).toBeInTheDocument();

    const pokemonPageElements = await screen.findAllByTestId(/pokemon-content/i);
    expect(pokemonPageElements.length).toBe(4);
  });
});
