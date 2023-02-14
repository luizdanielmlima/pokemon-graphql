import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { Pokemon } from "@favware/graphql-pokemon";

import PokemonCard from "../../components/PokemonCard/PokemonCard";
import classes from "./Pokemons.module.css";
import QueryBar from "../../components/QueryBar/QueryBar";
import OrderByForm from "../../components/OrderByForm/OrderByForm";
import { dynamicSort } from "../../shared/utils";
import LoadingErrorFeedback from "../../components/LoadingErrorFeedback/LoadingErrorFeedback";
import useGetPokemons from "../../api/hooks/useGetPokemons";
import { saveQueryLimitOnLS, getQueryLimitOnLS } from "../../shared/data";

const Pokemons = () => {
  const navigate = useNavigate();

  const [limit, setLimit] = useState(8); // has a total of 1118 pokemons!!

  const { pokemonsLoading, pokemonsError, pokemons } = useGetPokemons(limit);

  useEffect(() => {
    const lsLimit = getQueryLimitOnLS();

    if (lsLimit) {
      setLimit(+lsLimit);
    }
  }, []);

  const navToPokemonPage = (pkmon: Pokemon) => {
    const id = pkmon.key;
    navigate(`/pokemon/${id}`);
  };

  const [criteria, setCriteria] = useState<string>("num");

  const setNewQueryLimit = (enteredLimit: number) => {
    const limitHasChanged = enteredLimit !== limit;
    if (limitHasChanged) {
      saveQueryLimitOnLS(enteredLimit);
      setLimit(enteredLimit);
    }
  };

  // TO-DO: Must check this Typescript error, it shouldn't happen !
  const orderedData = useMemo(() => {
    let ordData: Pokemon[] = pokemons?.getAllPokemon ? [...pokemons?.getAllPokemon] : []; // reset

    if (pokemons?.getAllPokemon) {
      // here, a .map is used to separate the "main type" (the first on the array), to be used on the sort method
      ordData = [...pokemons?.getAllPokemon]
        .map((pokemon) => {
          return {
            ...pokemon,
            mainType: pokemon && pokemon.types ? pokemon.types[0].name : "",
          };
        })
        .sort(dynamicSort(criteria));
    }

    return ordData;
  }, [pokemons, criteria]);

  const handleOrderBySelect = (selection: string) => {
    setCriteria(selection);
  };

  let pokemonList;
  if (orderedData && orderedData.length > 0) {
    pokemonList = orderedData.map((pkmon: Pokemon) => {
      return (
        <PokemonCard key={`${pkmon.num}_${pkmon.key}`} data={pkmon} clicked={() => navToPokemonPage(pkmon)} isOnList />
      );
    });
  }

  return (
    <>
      {pokemonsLoading && <LoadingErrorFeedback mode="loading" />}
      {pokemonsError && <LoadingErrorFeedback mode="error" />}
      {!pokemonsLoading && !pokemonsLoading && pokemons && (
        <>
          <div data-testid="settings-bar" className={classes.settingsBar}>
            <QueryBar queryLimit={limit} setQueryLimit={(value: number) => setNewQueryLimit(value)} />
            <OrderByForm handleSelection={(selection: string) => handleOrderBySelect(selection)} />
          </div>
          <div className={classes.pokemons}>{pokemonList}</div>
        </>
      )}
    </>
  );
};

export default Pokemons;
