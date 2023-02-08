// Component
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import type { Query } from '@favware/graphql-pokemon';
import { apolloClient } from '../../api/pokemon-apollo-client';

interface GraphQLPokemonResponse<
  K extends keyof Omit<Query, '__typename'>,
> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

const GET_POKEMON_DETAILS = gql`
  {
    getPokemon(pokemon: vaporeon) {
      sprite
      num
      species
      color
    }
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery<
    GraphQLPokemonResponse<'getPokemon'>
  >(GET_POKEMON_DETAILS, {
    client: apolloClient,
  });

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  console.log(data);

  return <div> Insert how you want to display the data here </div>;
};

export default Test;
