import React, { FC, useState } from "react";

import type { LearnsetMove, Move } from "@favware/graphql-pokemon";

import classes from "./PokemonMoves.module.css";
import { pokemonTypeColors } from "../../shared/colors";

interface PokemonMovesItemProp {
  label: string;
  value: string | number;
}

const PokemonMovesItem: FC<PokemonMovesItemProp> = ({ label, value }) => {
  return (
    <div className={classes.flexRowCenter}>
      <p className={classes.detail__label}>{label}</p>
      <p className={classes.detail__value}>{value}</p>
    </div>
  );
};

interface PokemonMoves {
  moves: LearnsetMove[];
}

const PokemonMoves: FC<PokemonMoves> = ({ moves }) => {
  const [moveData, setMoveData] = useState<Move>();

  const getMoveItemClasses = (item: any) => {
    let moveItemClasses = `${classes.move}`;
    if (item.name === moveData?.name) {
      moveItemClasses = `${classes.move} ${classes.selectedMove}`;
    }
    return moveItemClasses;
  };

  const getPokemonColor = (colorName: string) => {
    console.log("getPokemonColor|colorName: ", colorName);
    const colorFound = pokemonTypeColors.find((item) => item.name === colorName);
    return colorFound ? colorFound.color : "#ddd";
  };

  let movesList;
  if (moves) {
    movesList = moves.map((item: any, index: number) => {
      return (
        <div
          key={`${index}_${item?.move?.key}`}
          className={getMoveItemClasses(item.move)}
          onClick={() => setMoveData(item?.move)}
        >
          <p className={classes.move__name}>{item.move?.name}</p>
        </div>
      );
    });
  }

  let moveDetail;

  if (!moveData) {
    moveDetail = (
      <p className={classes.detail__intro} style={{ fontStyle: "italic", fontWeight: "300" }}>
        Clik on the move name on the list to show its details
      </p>
    );
  }

  if (moveData) {
    moveDetail = (
      <div className={classes.detail}>
        <div className={`${classes.detail__header} ${classes.flexRowCenter}`}>
          <p className={classes.detail__title}>{moveData?.name}</p>
          <p
            style={{
              backgroundColor: getPokemonColor(moveData.key),
              padding: "0 6px",
              borderRadius: "5px",
            }}
          >
            {moveData?.type}
          </p>
        </div>
        <div className={`${classes.detail__line} ${classes.flexRowCenter}`}>
          <PokemonMovesItem label={`Power:`} value={moveData?.basePower ? moveData.basePower : "-"} />
          <PokemonMovesItem label={`Accuracy:`} value={moveData?.accuracy ? moveData.accuracy : "-"} />
          <PokemonMovesItem label={`PP:`} value={moveData?.pp ? moveData.pp : "-"} />
        </div>
        <div>
          <p>Description:</p>
          <p className={`${classes.detail__value}`}>{moveData.shortDesc ? moveData.shortDesc : "-"}</p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="pokemon-content-moves" className="pokemon-page-card">
      <p className="pokemon-page-title">MOVES</p>
      <div className={classes.moves}>
        <div className={classes.movesList}>{movesList}</div>
        {moveDetail}
      </div>
    </div>
  );
};

export default PokemonMoves;
