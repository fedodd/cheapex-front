import React from "react";
import classes from "./button.pcss";

const button = (props) => {
  return (
    <button
      className={
        props.isActive
          ? classes.button + " " + classes.is__active
          : classes.button
      }
      onClick={(e) => props.onClickHandler(e)}>
      {props.content}
    </button>
  );
};

export default button;
