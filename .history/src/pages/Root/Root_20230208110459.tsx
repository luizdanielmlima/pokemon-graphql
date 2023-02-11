import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

// images
import logo from '../../assets/PokemonBrowser_logo.png';
import pokemonsLeft from '../../assets/Banner_Pokemon_Left.png';
import popkemonsRight from '../../assets/Banner_Pokemon_Right.png';

import Pokemons from '../Pokemons/Pokemons';
import Pokemon from '../Pokemon/Pokemon';
import { mainContext } from '../../state/mainContext';
import { PokemonDetailType } from '../../shared/model';
import classes from './Root.module.css';
import Test from '../../components/Test/Test';

const RootPage = () => {
  const navigate = useNavigate();
  const [curPokemon, setCurPokemon] =
    useState<PokemonDetailType | null>();

  return (
    <mainContext.Provider
      value={{
        curPokemon: curPokemon || {},
        setCurPokemon: (value) => setCurPokemon(value),
      }}
    >
      <div className={classes.appContainer}>
        <header
          className={classes.appHeader}
          onClick={() => navigate('/')}
        >
          <img
            className={classes.appHeader__avatarsLeft}
            src={pokemonsLeft}
            alt="Pokemon Browser Logo"
          />
          <img
            className={classes.appHeader__logo}
            data-testid="headerLogo"
            src={logo}
            alt="Pokemon Browser Logo"
          />
          <img
            className={classes.appHeader__avatarsRight}
            src={popkemonsRight}
            alt="Pokemon Browser Logo"
          />
        </header>
        <div className={classes.appContent}>
          <Routes>
            {/* <Route path="/" element={<Pokemons />} />
            <Route path="/pokemon" element={<Pokemons />} />
            <Route path="pokemon/:id" element={<Pokemon />} /> */}
            <Route path="/" element={<Pokemons />} />
            <Route path="/pokemon" element={<Pokemons />} />
          </Routes>
        </div>
        <footer className={classes.appFooter}>
          <p>
            This app was developed by &nbsp;
            <a
              title="A link to got to the authors page"
              aria-label="Authors Page"
              data-testid="authorPageLink"
              href="http://www.luizdaniellima.com.br"
              target="_blank"
              rel="noreferrer"
            >
              Luiz Daniel Lima
            </a>
            &nbsp; with React v.17 ... and &hearts; ! on January 2022.
            I hope you enjoy!
          </p>
        </footer>
      </div>
    </mainContext.Provider>
  );
};

export default RootPage;
