import { Pokemon } from '@favware/graphql-pokemon';
import React from 'react';
import { baseStatsColors } from '../../shared/colors';

import { PokemonPageItemProps } from '../../shared/model';
import classes from './PokemonBaseStats.module.css';

interface PokemonBaseStatsProps {
  data: Pokemon;
}

const PokemonBaseStats = (props: PokemonBaseStatsProps) => {
  console.log('props: ', props);
  const { data } = props;
  const baseStats = data?.baseStats;
  console.log('baseStats: ', data?.baseStats);

  const getBarWidth = (value: number | undefined) => {
    let pct = '0';
    if (value) {
      pct = `${Math.round((value / 255) * 100)}%`;
    }
    return pct;
  };

  const getBarColor = (statName: string | undefined) => {
    let color = '#395FAA';
    if (statName) {
      const itemFound = baseStatsColors.find(
        (item) => item.name === statName,
      );
      color = itemFound ? itemFound.color : '#395FAA';
    }
    return color;
  };

  let content;
  if (baseStats) {
    content = Object.entries(baseStats).map(
      (baseStat: any, index: number) => {
        return (
          <div
            className={classes.statItem}
            key={`${index}_${baseStat[0]}`}
          >
            <p className={classes.statItem__name}>{baseStat[0]}</p>
            <div className={classes.statItem__mainbar}>
              <div
                className={classes.statItem__innerbar}
                style={{
                  width: getBarWidth(baseStat[1]),
                  backgroundColor: getBarColor(baseStat[0]),
                }}
              ></div>
            </div>
            <p className={classes.statItem__value}>
              {baseStat.base_stat}
            </p>
          </div>
        );
      },
    );
  }

  return (
    <div
      data-testid="pokemon-content-baseStats"
      className="pokemon-page-card"
    >
      <p className="pokemon-page-title">BASE STATS</p>
      {content}
    </div>
  );
};

export default PokemonBaseStats;
