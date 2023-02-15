import React, { useEffect, useState } from "react";

import classes from "./QueryBar.module.css";

const QueryBar = (props: any) => {
  const { queryLimit, setQueryLimit } = props;
  const [maxOfPokemons, setMaxOfPokemons] = useState<number>();
  const [enteredLimit, setEnteredLimit] = useState<number>(8);

  useEffect(() => {
    setEnteredLimit(queryLimit);
    getMaxNumOfPokemons();
  }, []);

  const getMaxNumOfPokemons = () => {
    // although the number of pokemons available is not that dynamic...
    // this will update the number if a pokemon is added
    // on Jan 21st the max number is 1118...
    const max = localStorage.getItem("maxNumOfPokemons");
    setMaxOfPokemons(max ? +max : 1118);
  };

  const changeLimit = (event: any) => {
    event.preventDefault();
    setQueryLimit(enteredLimit);
  };

  const limitChangeHandler = (event: any) => {
    setEnteredLimit(event.target.value);
  };

  return (
    <div className={classes.formContainer}>
      <form data-testid="query-form" onSubmit={changeLimit} className={classes.form}>
        <label>{`Search limit (up to ${maxOfPokemons} pokemons!) :`}</label>
        <div className={classes.inputAndButton}>
          <input data-testid="query-form-input" type="number" value={enteredLimit} onChange={limitChangeHandler} />
          <button data-testid="query-form-reload-btn" type="submit" className="button">
            Reload
          </button>
        </div>
      </form>
    </div>
  );
};

export default QueryBar;
