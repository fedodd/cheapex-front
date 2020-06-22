import React from 'react';
import classes from './checkbox.css';

function checkbox(props) {
  console.log(props.label);

  return (
    <label className={classes.label}>
      {props.label}
      <input type="checkbox"></input>
    </label>
  );
}

export default checkbox;
