import React, {useState ,useEffect} from 'react';
// import { trottle } from "lodash";
// import debounce from './../'
import useDebounce from "./../../hooks/debounce";

const inputText = (props) => {

  const [value, setValue] = useState(props.limit.type === 'min' ? props.values[0] : props.values[1]);

  const debouncedValue = useDebounce(value, 500);
// debounce
  useEffect(
    () => {
      if (debouncedValue) {
        setValue(debouncedValue)
      }
    },
    [debouncedValue] // Only call effect if debounced input changes
  );


// change on range slider move
  useEffect(
    () => {
      if (debouncedValue) {
        (props.limit.type === 'min' ) ? setValue(props.values[0]) : setValue(props.values[1])
      }
    },
    [props.values] // Only call effect if debounced prop changes
  );

// on input change
  useEffect(() => {
    // console.log('use effect on  value');
    function onInputHandler() {
      // console.log('in handler', value);
      const limits = props.limit.values;
      let newValue = value;

      if (props.limit.type === 'min' ) {
        if (value < limits.min ) {
          newValue = limits.min;
        } else if (value > limits.max) {
          newValue = limits.max
        } else if (value > props.values[1]) {
          newValue = props.values[1]
        }

      } else {
        if (value > limits.max ) {
          newValue = limits.max;
        } else if (value < limits.min) {
          newValue = limits.min
        } else if (value < props.values[0]) {
          newValue = props.values[0]
        }
      }
      // value === newValue  ? null : setValue(newValue);
      setValue(newValue);
      props.onChange(newValue)
    }

    onInputHandler(value)

  }, [debouncedValue]);

  const onChangeHandler = e => {
    isNaN(+e.target.value) ? setValue(0): setValue(+e.target.value)
  }


  return (
    <label>
      {props.label}
      <input type="text" value={value} onChange={e => onChangeHandler(e)} disabled={props.disabled}/>
    </label>
  );
};

export default inputText;
