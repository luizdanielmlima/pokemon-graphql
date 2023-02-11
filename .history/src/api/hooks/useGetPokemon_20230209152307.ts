import { useQuery, gql } from '@apollo/client';
import type { Query } from '@favware/graphql-pokemon';
import { apolloClient } from '../../api/pokemon-apollo-client';

interface GraphQLPokemonResponse<
  K extends keyof Omit<Query, '__typename'>,
> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

const useGetPokemon = (pokemonKey?: string | number) => {
  const GET_POKEMON = gql`
    {
        getPokemon(pokemon: ${pokemonKey}) {
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
    GraphQLPokemonResponse<'getPokemon'>
  >(GET_POKEMON, {
    client: apolloClient,
  });
  console.log('useGetPokemon data: ', data);

  return {
    pokemon: data?.data.getPokemon,
    pokemonLoading: loading,
    pokemonError: error,
  };
};

export default useGetPokemon;
