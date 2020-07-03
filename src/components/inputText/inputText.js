import React, { useState, useEffect } from "react";
// import { trottle } from "lodash";
// import debounce from './../'
import useDebounce from "./../../hooks/debounce";

const inputText = (props) => {
  const [value, setValue] = useState(
    props.limit.type === "min" ? props.values[0] : props.values[1]
  );

  const debouncedValue = useDebounce(value, 600);

  // change on range slider move
  useEffect(
    () => {
      // console.log(debouncedValue);
      props.limit.type === "min"
        ? setValue(props.values[0])
        : setValue(props.values[1]);
    },
    [props.values] // Only call effect if debounced prop changes
  );

  // on input change
  useEffect(() => {
    function onInputHandler() {
      const limits = props.limit.values;
      let newValue = debouncedValue;

      if (props.limit.type === "min") {
        if (value < limits.min) {
          newValue = limits.min;
        } else if (value > limits.max) {
          newValue = limits.max;
        } else if (value > props.values[1]) {
          newValue = props.values[1];
        }
      } else {
        if (value > limits.max) {
          newValue = limits.max;
        } else if (value < limits.min) {
          newValue = limits.min;
        } else if (value < props.values[0]) {
          newValue = props.values[0];
        }
      }
      setValue(newValue);
      console.log("new value");

      props.onChange(newValue);
    }

    onInputHandler(value);
  }, [debouncedValue]);

  const onChangeHandler = (e) => {
    // here we check if debouncedValue is 0 to fix problem with very quick clean input field. its a bug, need to fix it.
    if (isNaN(+e.target.value) || debouncedValue === 0) {
      props.limit.type === "min"
        ? setValue(props.limit.values.min)
        : setValue(props.limit.values.max);
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

export default React.memo(inputText);
