import React from 'react';

import {
  AbilityItem,
  PokemonPageItemProps,
} from '../../shared/model';

import classes from './PokemonAbilities.module.css';

const PokemonAbilities = (props: PokemonPageItemProps) => {
  const { data } = props;
  const abilitiesData = data?.abilities;

  const getColor = (isHidden: boolean | undefined) => {
    return isHidden ? '#95A6AE' : '#E1E9EC';
  };

  const getFontColor = (isHidden: boolean | undefined) => {
    return isHidden ? '#D5DDE1' : '#223A6B';
  };

  let abilitiesContent;
  if (abilitiesData) {
    abilitiesContent = abilitiesData.map(
      (item: AbilityItem, index: number) => {
        return (
          <div
            className={classes.abilityItem}
            key={`${index}_${item.ability?.name}`}
            style={{
              backgroundColor: getColor(item?.is_hidden),
              color: getFontColor(item?.is_hidden),
            }}
          >
            <p className={classes.abilityItem__name}>
              {item.ability?.name}
            </p>
          </div>
        );
      },
    );
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
