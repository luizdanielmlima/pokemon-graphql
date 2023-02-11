import React, { useState } from 'react';

import classes from './OrderByForm.module.css';

const OrderByForm = (props: any) => {
  const { handleSelection } = props;
  const [selection, setSelection] = useState('number');

  const changeHandler = (selectedOption: string) => {
    setSelection(selectedOption);
    handleSelection(selectedOption);
  };

  return (
    <div className={classes.formContainer}>
      <form data-testid="orderby-form" className={classes.form}>
        <label>Order by:</label>
        <select
          data-testid="orderby-select"
          name="orderBy"
          onChange={(event) => changeHandler(event.target.value)}
          value={selection}
        >
          <option value="key" aria-label="orderby-option">
            Name
          </option>
          <option value="mainType" aria-label="orderby-option">
            Type
          </option>
          <option value="num" aria-label="orderby-option">
            Dex number
          </option>
        </select>
      </form>
    </div>
  );
};

export default OrderByForm;
