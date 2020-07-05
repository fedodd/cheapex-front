import React, { useState, useEffect } from "react";
// import { trottle } from "lodash";
// import debounce from './../'
import useDebounce from "./../../hooks/debounce";

const inputText = (props) => {
  const [value, setValue] = useState(props.values[props.type]);
  const debouncedValue = useDebounce(value, 600);

  // change on range slider move
  useEffect(
    () => {
      setValue(props.values[props.type]);
    },
    [props.values[props.type]] // Only call effect if debounced prop changes
  );

  // on input change
  useEffect(() => {
    function onInputHandler() {
      const limits = props.limits;
      let newValue = debouncedValue;

      if (props.type === "min") {
        if (value < limits.min) {
          newValue = limits.min;
        } else if (value > props.values.max) {
          newValue = props.values.max;
        }
      } else {
        if (value > limits.max) {
          newValue = limits.max;
        } else if (value < props.values.min) {
          newValue = props.values.min;
        }
      }

      // didn't set new value if it's not change
      if (value !== newValue) setValue(newValue);
      props.onChange(
        props.type === "min"
          ? { min: newValue, max: props.values.max }
          : { min: props.values.min, max: newValue }
      );
    }

    onInputHandler(value);
  }, [debouncedValue]);

  const onChangeHandler = (e) => {
    // here we check if debouncedValue is 0 to fix problem with very quick clean input field. its a bug, need to fix it.
    if (isNaN(+e.target.value) || debouncedValue === 0) {
      setValue(props.limits[props.type]);
    } else {
      setValue(+e.target.value);
    }
  };

  return (
    <label>
      {props.label}
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeHandler(e)}
        disabled={props.disabled}
      />
    </label>
  );
};

export default inputText;
