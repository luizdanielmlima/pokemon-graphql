import React, { useState } from 'react';

import {
  FlavorTextEntry,
  MoveDetails,
  MoveItem,
  PokemonPageItemProps,
} from '../../shared/model';
import { getPokemonMove } from '../../shared/data';

import classes from './PokemonMoves.module.css';
import { pokemonTypeColors } from '../../shared/colors';

interface MovesItemProps {
  label: string;
  value: string | number;
}

const PokemonMovesItem = (props: MovesItemProps) => {
  const { label, value } = props;
  return (
    <div className={classes.flexRowCenter}>
      <p className={classes.detail__label}>{label}</p>
      <p className={classes.detail__value}>{value}</p>
    </div>
  );
};

const PokemonMoves = (props: PokemonPageItemProps) => {
  const { data } = props;
  const moves = data?.moves;
  const [moveData, setMoveData] = useState<MoveDetails | null>();

  const loadFullMoveData = async (url: string | undefined) => {
    if (url) {
      const moveData = await getPokemonMove(url);
      setMoveData(moveData?.data);
    } else {
      return null;
    }
  };

  const getMoveItemClasses = (item: MoveItem) => {
    let moveItemClasses = `${classes.move}`;
    if (item.move?.name === moveData?.name) {
      moveItemClasses = `${classes.move} ${classes.selectedMove}`;
    }
    return moveItemClasses;
  };

  const getPokemonColor = (colorName: string) => {
    const colorFound = pokemonTypeColors.find(
      (item) => item.name === colorName,
    );
    return colorFound ? colorFound.color : '#ddd';
  };

  const getDescription = () => {
    const enEntry = moveData?.flavor_text_entries.find(
      (textItem: FlavorTextEntry) => textItem.language.name === 'en',
    );
    return enEntry?.flavor_text;
  };

  let movesList;
  if (moves) {
    movesList = moves.map((item: MoveItem, index: number) => {
      return (
        <div
          key={`${index}_${item.move?.name}`}
          className={getMoveItemClasses(item)}
          onClick={() => loadFullMoveData(item.move?.url)}
        >
          <p className={classes.move__name}>{item.move?.name}</p>
        </div>
      );
    });
  }

  let moveDetail;
  if (!moveData) {
    moveDetail = (
      <p
        className={classes.detail__intro}
        style={{ fontStyle: 'italic', fontWeight: '300' }}
      >
        Clik on the move name on the list to show its details
      </p>
    );
  } else {
    moveDetail = (
      <div className={classes.detail}>
        <div
          className={`${classes.detail__header} ${classes.flexRowCenter}`}
        >
          <p className={classes.detail__title}>{moveData?.name}</p>
          <p
            style={{
              backgroundColor: getPokemonColor(moveData.type.name),
              padding: '0 6px',
              borderRadius: '5px',
            }}
          >
            {moveData?.type.name}
          </p>
        </div>
        <div
          className={`${classes.detail__line} ${classes.flexRowCenter}`}
        >
          <PokemonMovesItem
            label={`Power:`}
            value={moveData?.power ? moveData.power : '-'}
          />
          <PokemonMovesItem
            label={`Accuracy:`}
            value={moveData?.accuracy ? moveData.accuracy : '-'}
          />
          <PokemonMovesItem
            label={`PP:`}
            value={moveData?.pp ? moveData.pp : '-'}
          />
          <PokemonMovesItem
            label={`Damage class:`}
            value={
              moveData.damage_class.name
                ? moveData.damage_class.name
                : '-'
            }
          />
        </div>
        <div>
          <p>Description:</p>
          <p className={`${classes.detail__value}`}>
            {getDescription()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="pokemon-content-moves"
      className="pokemon-page-card"
    >
      <p className="pokemon-page-title">MOVES</p>
      <div className={classes.moves}>
        <div className={classes.movesList}>{movesList}</div>
        {moveDetail}
      </div>
    </div>
  );
};

export default PokemonMoves;
