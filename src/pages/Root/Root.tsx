import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router";

// images
import logo from "../../assets/PokemonBrowser_logo.png";
import pokemonsLeft from "../../assets/Banner_Pokemon_Left.png";
import popkemonsRight from "../../assets/Banner_Pokemon_Right.png";

import Pokemons from "../Pokemons/Pokemons";
import Pokemon from "../Pokemon/Pokemon";
import classes from "./Root.module.css";

const RootPage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.appContainer}>
      <header className={classes.appHeader} onClick={() => navigate("/")}>
        <img className={classes.appHeader__avatarsLeft} src={pokemonsLeft} alt="Pokemon Browser Logo" />
        <img className={classes.appHeader__logo} data-testid="headerLogo" src={logo} alt="Pokemon Browser Logo" />
        <img className={classes.appHeader__avatarsRight} src={popkemonsRight} alt="Pokemon Browser Logo" />
      </header>
      <div className={classes.appContent}>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/pokemon" element={<Pokemons />} />
          <Route path="pokemon/:id" element={<Pokemon />} />
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
          &nbsp; with React v.18.2 ... and &hearts; ! on Feb 2023. Data from @favware/graphql-pokemon. I hope you enjoy!
        </p>
      </footer>
    </div>
  );
};

export default RootPage;
