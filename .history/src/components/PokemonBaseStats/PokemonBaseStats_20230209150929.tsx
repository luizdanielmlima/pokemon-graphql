import React from 'react';
import { statsColors } from '../../shared/colors';

import { PokemonPageItemProps } from '../../shared/model';
import classes from './PokemonBaseStats.module.css';

interface BaseStats {
  attack: number;
  defense: number;
  hp: number;
  specialattack: number;
  specialdefense: number;
  speed: number;
}

const PokemonBaseStats = (props: BaseStats) => {
  const {
    attack,
    defense,
    hp,
    specialattack,
    specialdefense,
    speed,
  } = props;
  console.log('attack: ', attack);
  // const stats = data?.stats;

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
      const itemFound = statsColors.find(
        (item) => item.name === statName,
      );
      color = itemFound ? itemFound.color : '#395FAA';
    }
    return color;
  };

  let content;
  // if (stats) {
  //   content = stats.map((item: any, index: number) => {
  //     return (
  //       <div
  //         className={classes.statItem}
  //         key={`${index}_${item.stat?.name}`}
  //       >
  //         <p className={classes.statItem__name}>{item.stat?.name}</p>
  //         <div className={classes.statItem__mainbar}>
  //           <div
  //             className={classes.statItem__innerbar}
  //             style={{
  //               width: getBarWidth(item.base_stat),
  //               backgroundColor: getBarColor(item.stat?.name),
  //             }}
  //           ></div>
  //         </div>
  //         <p className={classes.statItem__value}>{item.base_stat}</p>
  //       </div>
  //     );
  //   });
  }

  return (
    <div
      data-testid="pokemon-content-stats"
      className="pokemon-page-card"
    >
      <p className="pokemon-page-title">BASE STATS</p>
      {content}
    </div>
  );
};

export default PokemonBaseStats;
