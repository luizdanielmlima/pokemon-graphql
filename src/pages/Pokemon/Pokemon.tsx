import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { LearnsetMove } from "@favware/graphql-pokemon";

import classes from "./Pokemon.module.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import PokemonBaseStats from "../../components/PokemonBaseStats/PokemonBaseStats";
import PokemonAbilities from "../../components/PokemonAbilities/PokemonAbilities";
import PokemonMiscInfo from "../../components/PokemonMiscInfo/PokemonMiscInfo";
import PokemonMoves from "../../components/PokemonMoves/PokemonMoves";
import LoadingErrorFeedback from "../../components/LoadingErrorFeedback/LoadingErrorFeedback";
import useGetPokemon from "../../api/hooks/useGetPokemon";

const Pokemon = () => {
  let params = useParams();
  const navigate = useNavigate();

  const { pokemonLoading, pokemonError, pokemon } = useGetPokemon(params?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navToHome = () => {
    navigate(`/`);
  };

  return (
    <div className={classes.pokemonPage}>
      {pokemonLoading && <LoadingErrorFeedback mode="loading" />}

      {pokemonError && <LoadingErrorFeedback mode="loading" />}

      {!pokemonLoading && pokemon && (
        <>
          <button data-testid="back-button" className={classes.backBtn} onClick={navToHome}>{`< Go Back`}</button>
          <main className={classes.content}>
            <PokemonCard
              key={`${pokemon?.getPokemon?.key}`}
              data={pokemon?.getPokemon || null}
              clicked={() => {}}
              isOnList={false}
            />
            <PokemonBaseStats data={pokemon?.getPokemon || null} />
            <div className={classes.abilities}>
              <PokemonAbilities data={pokemon?.getPokemon || null} />
            </div>
            <PokemonMiscInfo data={pokemon?.getPokemon || null} />

            {pokemon?.getPokemon?.learnsets?.generation3?.eventMoves &&
              pokemon?.getPokemon?.learnsets?.generation3?.eventMoves.length > 0}
            <div className={classes.moves}>
              <PokemonMoves
                moves={(pokemon?.getPokemon?.learnsets?.generation3?.eventMoves as LearnsetMove[]) || null}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Pokemon;
