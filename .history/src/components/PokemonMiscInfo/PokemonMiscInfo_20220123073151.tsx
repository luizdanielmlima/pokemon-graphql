import React from 'react';

import { PokemonPageItemProps } from '../../shared/model';
import classes from './PokemonMiscInfo.module.css';

interface InfoItemProps {
  label: string;
  value: any;
  unit: string | null;
}

const InfoItem = (props: InfoItemProps) => {
  const { label, value, unit } = props;
  return (
    <div className={classes.item}>
      <p className={classes.item__label}>{label}</p>
      <p className={classes.item__value}>{value}</p>
      <p className={classes.item__unit}>{unit ? unit : ''}</p>
    </div>
  );
};

const PokemonMiscInfo = (props: PokemonPageItemProps) => {
  const { data } = props;

  const convUnit = (value: number | undefined) => {
    //   height is in decimeters and weight is in hectograms!
    return value ? value / 10 : null;
  };

  return (
    <div
      data-testid="pokemon-content-info"
      className="pokemon-page-card"
      style={{ alignSelf: 'self-start' }}
    >
      <p className="pokemon-page-title">MISC INFO</p>
      <div className={classes.items}>
        <InfoItem
          label={`Base EXP:`}
          value={data?.base_experience}
          unit={null}
        />
        <InfoItem
          label={`Height:`}
          value={convUnit(data?.height)}
          unit={'m'}
        />
        <InfoItem
          label={`Weight:`}
          value={convUnit(data?.weight)}
          unit={'kg'}
        />
        <InfoItem
          label={`Species:`}
          value={data?.species?.name}
          unit={null}
        />
        <InfoItem label={`Order:`} value={data?.order} unit={null} />
      </div>
    </div>
  );
};

export default PokemonMiscInfo;
