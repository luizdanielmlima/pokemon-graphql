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

const Loading = () => {};

const Pokemons = () => {
  const navigate = useNavigate();
  const context = useContext(mainContext);

  // state
  const [limit, setLimit] = useState(8); // has a total of 1118 pokemons!!
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [pokemonsData, setPokemonsData] =
    useState<PokemonDetailType[]>();
  const [orderedData, setOrderedData] =
    useState<PokemonDetailType[]>();

  useEffect(() => {
    checkAndRefresh();
  }, []);

  const checkAndRefresh = () => {
    // if there is a limit saved on LS, use it
    const lsLimit = getQueryLimitOnLS();

    if (lsLimit) {
      setLimit(+lsLimit);
      getData(+lsLimit, false);
    } else {
      getData(limit, false);
    }
  };

  const navToPokemonPage = (pkmon: PokemonDetailType) => {
    context?.setCurPokemon(pkmon);
    const id = pkmon?.id?.toString();
    navigate(`/pokemon/${id}`);
  };

  const setNewQueryLimit = (enteredLimit: number) => {
    const limitHasChanged = enteredLimit !== limit;
    saveQueryLimitOnLS(enteredLimit);
    setLimit(enteredLimit);

    getData(enteredLimit, limitHasChanged);
  };

  const getData = async (limit: number, limitHasChanged: boolean) => {
    setIsLoading(true);

    const loadLocalData = await hasLocalData();
    let allPokemonsData: PokemonDetailType[] = [];

    if (loadLocalData && !limitHasChanged) {
      const localPokemonsData =
        (await getFromLocalDB()) as PokemonDetailType[];
      // console.log('allPokemonsData (LOCAL!!): ', localPokemonsData);
      allPokemonsData = localPokemonsData;
      setNewStateData(allPokemonsData);
    } else {
      // must load data from API then...
      getAllPokemonsData(limit)
        .then((data: any) => {
          allPokemonsData = data ? data : [];
          setNewStateData(allPokemonsData);
          // console.log('allPokemonsData (REMOTE): ', allPokemonsData);
        })
        .catch((error: any) => {
          setIsLoading(false);
          setHasError(true);
        });
    }
  };

  const setNewStateData = (data: PokemonDetailType[]) => {
    setPokemonsData(data);
    setOrderedData(data);
    setIsLoading(false);
  };

  const handleOrderBySelect = (selection: string) => {
    orderData(selection);
  };

  const orderData = (criteria: string) => {
    let ordData: PokemonDetailType[] = pokemonsData
      ? [...pokemonsData]
      : []; // reset

    if (pokemonsData) {
      // here, a .map is used to separate the "main type" (the first on the array), to be used on the sort method
      ordData = [...pokemonsData]
        .map((item) => {
          return {
            ...item,
            mainType:
              item && item.types ? item.types[0]?.type?.name : '',
          };
        })
        .sort(dynamicSort(criteria));
    }

    setOrderedData(ordData);
  };

  let pokemonList;
  if (orderedData) {
    pokemonList = orderedData.map(
      (pkmon: PokemonDetailType, index: number) => {
        return (
          <PokemonCard
            key={index}
            data={pkmon}
            clicked={() => navToPokemonPage(pkmon)}
            isOnList
          />
        );
      },
    );
  }

  let content;
  if (isLoading) {
    content = <LoadingErrorFeedback mode="loading" />;
  } else if (hasError) {
    content = <LoadingErrorFeedback mode="error" />;
  } else {
    content = (
      <>
        <div
          data-testid="settings-bar"
          className={classes.settingsBar}
        >
          <QueryBar
            queryLimit={limit}
            setQueryLimit={(value: number) => setNewQueryLimit(value)}
          />
          <OrderByForm
            handleSelection={(selection: string) =>
              handleOrderBySelect(selection)
            }
          />
        </div>
        <div className={classes.pokemons}>{pokemonList}</div>
      </>
    );
  }

  return <>{content}</>;
};

export default Pokemons;
