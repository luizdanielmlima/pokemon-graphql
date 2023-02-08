import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  getFromLocalDB,
  getAllPokemonsData,
  hasLocalData,
  saveQueryLimitOnLS,
  getQueryLimitOnLS,
} from '../../shared/data';

import { mainContext } from '../../state/mainContext';
import { PokemonDetailType } from '../../shared/model';

import PokemonCard from '../../components/PokemonCard/PokemonCard';
import classes from './Pokemons.module.css';
import QueryBar from '../../components/QueryBar/QueryBar';
import OrderByForm from '../../components/OrderByForm/OrderByForm';
import { dynamicSort } from '../../shared/utils';
import LoadingErrorFeedback from '../../components/LoadingErrorFeedback/LoadingErrorFeedback';
import useGetPokemons from '../../api/hooks/useGetPokemons';
import { Pokemon } from '@favware/graphql-pokemon';

const Loading = () => {};

const Pokemons = () => {
  const navigate = useNavigate();
  const context = useContext(mainContext);

  const [limit, setLimit] = useState(8); // has a total of 1118 pokemons!!

  const { pokemonsLoading, pokemonsError, pokemons } =
    useGetPokemons();

  const navToPokemonPage = (pkmon: Pokemon) => {
    // context?.setCurPokemon(pkmon);
    // const id = pkmon?.key?.toString();
    // navigate(`/pokemon/${id}`);
  };

  let pokemonList;
  if (pokemons) {
    pokemonList = pokemons.data.getAllPokemon.map(
      (pkmon: Pokemon) => {
        return (
          <PokemonCard
            key={pkmon.num}
            data={pkmon}
            clicked={() => navToPokemonPage(pkmon)}
            isOnList
          />
        );
      },
    );
  }

  return (
    <>
      {pokemonsLoading && <LoadingErrorFeedback mode="loading" />}
      {pokemonsError && <LoadingErrorFeedback mode="error" />}
      {!pokemonsLoading && !pokemonsLoading && pokemons && (
        <>
          <div
            data-testid="settings-bar"
            className={classes.settingsBar}
          >
            <p>set limit here</p>
            <p>order by here</p>
            {/* <QueryBar
                  queryLimit={limit}
                  setQueryLimit={(value: number) => setNewQueryLimit(value)}
                />
                <OrderByForm
                  handleSelection={(selection: string) =>
                    handleOrderBySelect(selection)
                  }
                /> */}
          </div>
          <div className={classes.pokemons}>{pokemonList}</div>
        </>
      )}
    </>
  );
};

export default Pokemons;
