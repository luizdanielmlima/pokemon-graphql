import { Pokemon } from '@favware/graphql-pokemon';
import React, { FC } from 'react';

import {
  AbilityItem,
  PokemonPageItemProps,
} from '../../shared/model';

import classes from './PokemonAbilities.module.css';

const PokemonAbilities: FC<{ data: Pokemon }> = ({ data }) => {
  console.log('PokemonAbilities data: ', data);
  const abilitiesData =
    data?.abilities &&
    Object.entries(data?.abilities).filter(
      (item) => item !== null && item[0] !== '__typename',
    );
  console.log('abilitiesData: ', abilitiesData);

  const getColor = (isHidden: boolean | undefined) => {
    return isHidden ? '#95A6AE' : '#E1E9EC';
  };

  const getFontColor = (isHidden: boolean | undefined) => {
    return isHidden ? '#D5DDE1' : '#223A6B';
  };

  let abilitiesContent;
  if (abilitiesData) {
    abilitiesData.map((ability: any, index: number) => {
      return (
        <div className={classes.abilityItem} key={`${index}`}>
          <p className={classes.abilityItem__name}>Test</p>
          <p>Test</p>
        </div>
      );
    });
  }

  return (
    <div
      data-testid="pokemon-content-abilities"
      className="pokemon-page-card"
    >
      <p className="pokemon-page-title">ABILITIES</p>
      <div className={classes.content}>
        <div className={classes.abilities}>{abilitiesContent}</div>
        <div className={classes.legend}>
          <div className={classes.legend__indicator}></div>
          <p className={classes.legend__label}>hidden</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonAbilities;
