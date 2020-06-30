import React, {useState ,useEffect} from 'react';
// import { trottle } from "lodash";
// import debounce from './../'
import useDebounce from "./../../hooks/debounce";

const inputText = (props) => {

  const [value, setValue] = useState(props.limit.type === 'min' ? props.values[0] : props.values[1]);
  // const [inputValues, setInputValues] = useState(props.limit.type === 'min' ? props.values[0] : props.values[1])

  const debouncedValue = useDebounce(value, 500);

  useEffect(
    () => {
      console.log('here in use efefct for debounce');

      if (debouncedValue) {
        setValue(debouncedValue)
      }
    },
    [debouncedValue] // Only call effect if debounced search term changes
  );


  useEffect(() => {
    // console.log('use effect on  value');
    function onInputHandler() {
      console.log('in handler', value);
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
      value === newValue  ? null : setValue(newValue);
      props.onChange(newValue)
    }


    console.log(props.values, value, props.values[0] === value, props.values[1] === value);

    onInputHandler(value)



  }, [debouncedValue]);

  // useEffect(() => {
  //       // console.log('use effect on  props' , props.values, value, props.values[0] === value, props.values[1] === value,);
  //       console.log('changed', props.values, value);
  //   if ((props.limit.type === 'min' && props.values[0] === value) || (props.limit.type === 'max' && props.values[1] === value)) {
  //     console.log('true');
  //     setValue(props.values[0])
  //   }
  // }, [props.values]);

  // const onChangeHandler = (e) => {
  //   console.log('in debounce');

  //   debounce(+e.target.value, 500)
  // }


  return (
    <label>
      {props.label}
      <input type="text" value={value} onChange={e => setValue(+e.target.value)} disabled={props.disabled}/>
    </label>
  );
};

export default inputText;
