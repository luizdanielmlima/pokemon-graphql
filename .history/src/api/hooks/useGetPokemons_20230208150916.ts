import { useQuery, gql } from '@apollo/client';
import type { Query } from '@favware/graphql-pokemon';
import { apolloClient } from '../pokemon-apollo-client';

interface GraphQLPokemonResponse<
  K extends keyof Omit<Query, '__typename'>,
> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

const useGetPokemons = (from: number = 88, limit: number = 32) => {
  // const GET_POKEMONS = gql`
  //   query getAllPokemon($offset: Int, $take: Int) {
  //     key
  //     weight
  //     height
  //     sprite
  //     baseStats {
  //       attack
  //       defense
  //       hp
  //       specialattack
  //       specialdefense
  //       speed
  //     }
  //   }
  // `;

  const GET_POKEMONS = gql`
    {
      getAllPokemon(offset: ${from}, take: ${limit}) {
        key
        num
        sprite
        weight
        height
        types {
          name
        }
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
      }
    }
  `;

  const { loading, error, data } = useQuery<
    GraphQLPokemonResponse<'getAllPokemon'>
  >(GET_POKEMONS, {
    client: apolloClient,
  });
  // const { loading, error, data } = useQuery(GET_POKEMONS, {
  //   client: apolloClient,
  //   variables: { offset: from, take: limit },
  // });

  return {
    pokemons: data,
    pokemonsLoading: loading,
    pokemonsError: error,
  };
};

export default useGetPokemons;
