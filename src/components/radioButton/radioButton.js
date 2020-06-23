import React from 'react';
import classes from './radioButton.css';

const radioButton = (props) => {
  return (
    <label
      className={
        props.style
          ? classes.label + ' ' + classes[props.styled]
          : classes.label
      }>
      {props.label}
      <input type="radio" name={props.name}></input>
    </label>
  );
};

export default radioButton;
