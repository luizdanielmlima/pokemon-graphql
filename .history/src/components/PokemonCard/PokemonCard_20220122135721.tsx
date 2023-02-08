import React, { useState } from 'react';
import { pokemonTypeColors } from '../../shared/colors';

import { PokemonDetailType, Type } from '../../shared/model';
import classes from './PokemonCard.module.css';

interface PokemonCardProps {
  clicked: () => {} | void;
  key: number;
  data: PokemonDetailType | null;
  isOnList: boolean;
}

const PokemonCard = (props: PokemonCardProps) => {
  const data = props.data;
  const [avatar, setAvatar] = useState<
    'front_default' | 'front_shiny'
  >('front_default');

  const getPokemonColor = (colorName: string) => {
    const colorFound = pokemonTypeColors.find(
      (item) => item.name === colorName,
    );
    return colorFound ? colorFound.color : '#ddd';
  };

  const getAvatarUrl = () => {
    let avatarUrl = data?.sprites?.front_default;
    if (avatar === 'front_shiny') {
      avatarUrl = data?.sprites?.front_shiny;
    }
    return avatarUrl;
  };

  const getSwitchColor = (mode: string) => {
    return mode === avatar ? '#395faa' : '#3f484b';
  };

  let pokemonContent;
  let typesContent;

  if (!data) {
    pokemonContent = <p>loading....</p>;
  } else if (data) {
    typesContent = data.types?.map(
      (typeItem: Type, index: number) => {
        return (
          <p
            key={`${typeItem.type}${index}`}
            className={classes.pokemon__type}
            style={{
              backgroundColor: getPokemonColor(typeItem.type.name),
            }}
          >
            {typeItem.type.name}
          </p>
        );
      },
    );

    let avatarSwitcher;
    if (!props.isOnList) {
      avatarSwitcher = (
        <div className={classes.pokemon__switch}>
          <p
            className={classes.pokemon__switchLabel}
            onClick={() => setAvatar('front_default')}
            style={{ color: `${getSwitchColor('front_default')}` }}
          >
            normal
          </p>
          <p className={classes.pokemon__switchSep}>|</p>
          <p
            className={classes.pokemon__switchLabel}
            onClick={() => setAvatar('front_shiny')}
            style={{ color: `${getSwitchColor('front_shiny')}` }}
          >
            shiny
          </p>
        </div>
      );
    }

    pokemonContent = (
      <div
        data-testid="pokemon-content-card"
        className={`${classes.pokemon} ${
          props.isOnList ? classes.hoverCard : null
        }`}
        onClick={props.clicked}
      >
        <div className={classes.pokemon__info}>
          <p className={classes.pokemon__id}>#{data.id}</p>
          <p className={classes.pokemon__name}>{data.name}</p>
        </div>
        <div className={classes.pokemon__img}>
          {avatarSwitcher}
          <img
            loading="lazy"
            src={`${getAvatarUrl()}`}
            alt="pokemon avatar"
          />
        </div>
        <div className={classes.pokemon__types}>{typesContent}</div>
      </div>
    );
  }

  return <React.Fragment>{pokemonContent}</React.Fragment>;
};

export default PokemonCard;
