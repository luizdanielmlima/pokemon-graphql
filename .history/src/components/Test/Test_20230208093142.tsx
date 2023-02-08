// Component
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import type { Query } from '@favware/graphql-pokemon';
import { client } from '../../api/pokemon-apollo-client';

interface GraphQLPokemonResponse<
  K extends keyof Omit<Query, '__typename'>,
> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

const GET_POKEMON_DETAILS = gql`
  {
    getPokemon(pokemon: dragonite) {
      sprite
      num
      species
      color
    }
  }
`;

export const Test: React.FC = () => {
  const { loading, error, data } = useQuery<
    GraphQLPokemonResponse<'getPokemon'>
  >(GET_POKEMON_DETAILS, {
    client: client,
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return <div> Insert how you want to display the data here </div>;
};
