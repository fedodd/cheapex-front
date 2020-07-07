import React from 'react';
import classes from './checkbox.css';

function checkbox(props) {
  return (
    <label
      className={
        props.style
          ? classes.label + ' ' + classes[props.styled]
          : classes.label
      }>
      {props.label}
      <input type="checkbox"></input>
    </label>
  );
}

export default checkbox;
