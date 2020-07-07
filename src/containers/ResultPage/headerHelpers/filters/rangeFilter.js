/* eslint react/no-multi-comp: 0, no-console: 0 */
// import '../assets/index.less';

import React, { useState, useEffect } from "react";

import Slider, { Range } from "rc-slider";

import useDebounce from "./../../../../hooks/debounce";

import "rc-slider/assets/index.css";
// import './rangeStyle.css';
import classes from "./filters.pcss";

const rangeFilter = (props) => {
  const [values, setValues] = useState(props.values);
  const debouncedValues = useDebounce(values, 300);

  const onChangeHandler = (changedValues) => {
    // props.onChangeHandler(changedValues);
    setValues({
      min: changedValues[0],
      max: changedValues[1],
    });
  };

  useEffect(() => {
    props.onChangeHandler(debouncedValues);
  }, [debouncedValues]);

  // change on input changes
  useEffect(
    () => {
      setValues(props.values);
    },
    [props.values] // Only call effect if debounced prop changes
  );

  return (
    <div className={classes.rangeTrack}>
      <Range
        min={props.min}
        max={props.max}
        value={[values.min, values.max]}
        disabled={props.disabled}
        onChange={(values) => onChangeHandler(values)}
        // railStyle={{
        //   height: 10,
        // }}
        handleStyle={[
          {
            height: 20,
            width: 20,
            marginLeft: 0,
            marginTop: -5,
            backgroundColor: "white",
            boxShadow: "0px 0px 5px 1px grey",
          },
          {
            height: 20,
            width: 20,
            marginLeft: 0,
            marginTop: -5,
            backgroundColor: "white",
            borderColor: "lightblue",
            boxShadow: "0px 0px 5px 1px grey",
          },
        ]}
        trackStyle={[
          {
            height: 10,
            borderRadius: 0,
            backgroundColor: "lightblue",
          },
        ]}
      />
    </div>
  );
};

export default rangeFilter;
