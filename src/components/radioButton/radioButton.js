import React from 'react';
import classes from './radioButton.css';

const radioButton = (props) => {
  // const [checked, setChecked] = React.useState(props.isChecked);

  // const onClickHandler = () => {
  //   setChecked(!checked);
  //   props.onClickHandler();
  // };

  return (
    <label
      className={
        props.style
          ? classes.label + ' ' + classes[props.styled]
          : classes.label
      }>
      {props.label}
      <input
        type="radio"
        name={props.name}
        checked={props.isChecked}
        onChange={() => props.onClickHandler()}></input>
    </label>
  );
};

export default radioButton;
