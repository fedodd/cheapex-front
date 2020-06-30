/* eslint react/no-multi-comp: 0, no-console: 0 */
// import '../assets/index.less';

import React from 'react';
// import Slider from '../src';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
// import './rangeStyle.css';
import classes from './filters.pcss';

function log(value) {
  console.log(value); //eslint-disable-line
}

class RangeFilter extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   values: [0, 0],
  //   // };
  // }

  // onLowerBoundChange = (e) => {
  //   this.setState({ lowerBound: +e.target.value });
  // };

  // onUpperBoundChange = (e) => {
  //   this.setState({ upperBound: +e.target.value });
  // };

  // onChange = (values) => {
  //   this.props.onChangeHandler(values);
  //   this.setState({
  //     values,
  //   });
  // };

  // handleApply = () => {
  //   const { lowerBound, upperBound } = this.state;
  //   this.setState({ value: [lowerBound, upperBound] });
  // };

  // componentDidMount() {
  //   this.setState({ values: this.props.values });
  // }

  // componentDidUpdate() {
  //   this.setState({ values: this.props.values });
  // }

  render() {
    return (
      <div className={classes.rangeTrack}>
        <Range
          min={this.props.min}
          max={this.props.max}
          value={this.props.values}
          disabled={this.props.disabled}
          onChange={this.props.onChangeHandler}
          // railStyle={{
          //   height: 10,
          // }}
          handleStyle={[
            {
              height: 20,
              width: 20,
              marginLeft: 0,
              marginTop: -5,
              backgroundColor: 'white',
              boxShadow: '0px 0px 5px 1px grey',
            },
            {
              height: 20,
              width: 20,
              marginLeft: 0,
              marginTop: -5,
              backgroundColor: 'white',
              borderColor: 'lightblue',
              boxShadow: '0px 0px 5px 1px grey',
            },
          ]}
          trackStyle={[
            {
              height: 10,
              borderRadius: 0,
              backgroundColor: 'lightblue',
            },
          ]}
        />
      </div>
    );
  }
}

export default RangeFilter;
