// Component
import React from 'react';
import useGetPokemon from '../../api/hooks/useGetPokemon';

const Test = () => {
  const { pokemonLoading, pokemonError, pokemon } =
    useGetPokemon('pikachu');

  if (pokemonLoading) return <p>'Loading...'</p>;
  if (pokemonError) return <p>`Error! ${pokemonError.message}`</p>;

  console.log(pokemon);

  return <div> Insert how you want to display the data here </div>;
};

export default Test;
