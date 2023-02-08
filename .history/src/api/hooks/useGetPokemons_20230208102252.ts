import { useQuery, gql } from '@apollo/client';
import type { Query } from '@favware/graphql-pokemon';
import { apolloClient } from '../pokemon-apollo-client';

interface GraphQLPokemonResponse<
  K extends keyof Omit<Query, '__typename'>,
> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

const useGetPokemon = () => {
  const GET_POKEMONS = gql`
  getAllPokemon(offset: $offset) {
    sprite
    weight
    height
    abilities {
      first {
        name
      }
      second {
        name
      }
    }
    baseStats {
      attack
      defense
      hp
      specialattack
      specialdefense
      speed
    }
    key
    types {
      name
    }
  }
    `;

  const { loading, error, data } = useQuery<
    GraphQLPokemonResponse<'getAllPokemon'>
  >(GET_POKEMONS, {
    client: apolloClient,
  });

  return {
    pokemons: data,
    pokemonsLoading: loading,
    pokemonsError: error,
  };
};

export default useGetPokemon;
