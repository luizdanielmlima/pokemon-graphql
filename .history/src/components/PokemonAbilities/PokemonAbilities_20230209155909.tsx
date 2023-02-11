import { Pokemon } from '@favware/graphql-pokemon';
import React, { FC } from 'react';

import {
  AbilityItem,
  PokemonPageItemProps,
} from '../../shared/model';

import classes from './PokemonAbilities.module.css';

const PokemonAbilities: FC<{ data: Pokemon }> = ({ data }) => {
  console.log('PokemonAbilities data: ', data);
  const abilitiesData = data?.abilities;

  const getColor = (isHidden: boolean | undefined) => {
    return isHidden ? '#95A6AE' : '#E1E9EC';
  };

  const getFontColor = (isHidden: boolean | undefined) => {
    return isHidden ? '#D5DDE1' : '#223A6B';
  };

  let abilitiesContent;
  if (abilitiesData) {
    abilitiesContent = Object.entries(abilitiesData)
      .filter((item) => item[0] !== '__typename')
      .map((ability: any, index: number) => {
        return (
          <div
            className={classes.abilityItem}
            key={`${index}_${ability[0].name}`}
            style={{
              backgroundColor: getColor(ability.is_hidden),
              color: getFontColor(ability.is_hidden),
            }}
          >
            <p className={classes.abilityItem__name}>
              {ability[0].name}
            </p>
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
