import React, { useState } from "react";

import { Pokemon } from "@favware/graphql-pokemon";

import classes from "./PokemonMoves.module.css";
import { pokemonTypeColors } from "../../shared/colors";

interface PokemonBaseStatsProps {
  data: Pokemon;
}

const PokemonMovesItem = (props: any) => {
  const { data } = props;
  return (
    <div className={classes.flexRowCenter}>
      <p className={classes.detail__label}>{label}</p>
      <p className={classes.detail__value}>{value}</p>
    </div>
  );
};

const PokemonMoves = (props: any) => {
  const { data } = props;
  const [moveData, setMoveData] = useState();

  const getMoveItemClasses = (item: any) => {
    let moveItemClasses = `${classes.move}`;
    if (item.name === moveData?.name)) {
      moveItemClasses = `${classes.move} ${classes.selectedMove}`;
    }
    return moveItemClasses;
  };

  const getPokemonColor = (colorName: string) => {
    const colorFound = pokemonTypeColors.find((item) => item.name === colorName);
    return colorFound ? colorFound.color : "#ddd";
  };

  // const getDescription = () => {
  //   const enEntry = moveData?.flavor_text_entries.find((textItem: FlavorTextEntry) => textItem.language.name === "en");
  //   return enEntry?.flavor_text;
  // };

  let movesList;
  if (data) {
    movesList = data.map((item: any, index: number) => {
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
  } else {
    moveDetail = (
      <div className={classes.detail}>
        <div className={`${classes.detail__header} ${classes.flexRowCenter}`}>
          <p className={classes.detail__title}>{moveData?.name}</p>
          <p
            style={{
              backgroundColor: getPokemonColor(moveData.type.name),
              padding: "0 6px",
              borderRadius: "5px",
            }}
          >
            {moveData?.type.name}
          </p>
        </div>
        <div className={`${classes.detail__line} ${classes.flexRowCenter}`}>
          <PokemonMovesItem label={`Power:`} value={moveData?.power ? moveData.power : "-"} />
          <PokemonMovesItem label={`Accuracy:`} value={moveData?.accuracy ? moveData.accuracy : "-"} />
          <PokemonMovesItem label={`PP:`} value={moveData?.pp ? moveData.pp : "-"} />
          <PokemonMovesItem
            label={`Damage class:`}
            value={moveData.damage_class.name ? moveData.damage_class.name : "-"}
          />
        </div>
        <div>
          <p>Description:</p>
          <p className={`${classes.detail__value}`}>{getDescription()}</p>
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
