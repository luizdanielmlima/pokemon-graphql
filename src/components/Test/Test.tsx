// Component
import React from "react";
import useGetPokemons from "../../api/hooks/useGetPokemons";

const Test = () => {
  const { pokemonsLoading, pokemonsError, pokemons } = useGetPokemons();

  if (pokemonsLoading) return <p>'Loading...'</p>;
  if (pokemonsError) return <p>`Error! ${pokemonsError.message}`</p>;

  console.log(pokemons);

  return <div> Insert how you want to display the data here </div>;
};

export default Test;
