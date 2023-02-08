import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { mainContext } from '../../state/mainContext';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { getPokemon } from '../../shared/data';
import { PokemonDetailType } from '../../shared/model';
import classes from './Pokemon.module.css';
import PokemonBaseStats from '../../components/PokemonBaseStats/PokemonBaseStats';
import PokemonAbilities from '../../components/PokemonAbilities/PokemonAbilities';
import PokemonMiscInfo from '../../components/PokemonMiscInfo/PokemonMiscInfo';
import PokemonMoves from '../../components/PokemonMoves/PokemonMoves';
import LoadingErrorFeedback from '../../components/LoadingErrorFeedback/LoadingErrorFeedback';

const Pokemon = (props: any) => {
  let params = useParams();
  const navigate = useNavigate();
  const context = useContext(mainContext);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [pokemonData, setPokemonData] =
    useState<PokemonDetailType | null>();

  useEffect(() => {
    window.scrollTo(0, 0);
    checkForPokemonDataSource();
  }, []);

  const checkForPokemonDataSource = () => {
    setIsLoading(true);
    const curPokemonData = context?.curPokemon;

    if (curPokemonData && curPokemonData.id) {
      setPokemonData(curPokemonData);
      setIsLoading(false);
    } else {
      // no data found, pokemon page was accessed directly (url) !?
      const pokemonId = params.id;
      loadPokemonData(pokemonId)
        .then((resp) => {
          if (resp && resp.data) {
            setPokemonData(resp.data);
          } else {
            setHasError(true);
          }
          setIsLoading(false);
        })
        .catch((error: any) => {
          setIsLoading(false);
          setHasError(true);
        });
    }
  };

  const loadPokemonData = async (id: string | undefined) => {
    if (id) {
      const pokemonData = await getPokemon(id);
      return pokemonData;
    }
  };

  const navToHome = () => {
    navigate(`/`);
  };

  let content;
  if (isLoading) {
    content = <LoadingErrorFeedback mode="loading" />;
  } else if (hasError) {
    content = <LoadingErrorFeedback mode="error" />;
  } else {
    content = (
      <>
        <button
          data-testid="back-button"
          className={classes.backBtn}
          onClick={navToHome}
        >{`< Go Back`}</button>
        <main className={classes.content}>
          <PokemonCard
            key={pokemonData?.id || 1}
            data={pokemonData || null}
            clicked={() => {}}
            isOnList={false}
          />
          <PokemonBaseStats data={pokemonData || null} />
          <div className={classes.abilities}>
            <PokemonAbilities data={pokemonData || null} />
          </div>
          <PokemonMiscInfo data={pokemonData || null} />
          <div className={classes.moves}>
            <PokemonMoves data={pokemonData || null} />
          </div>
        </main>
      </>
    );
  }

  return <div className={classes.pokemonPage}>{content}</div>;
};

export default Pokemon;
