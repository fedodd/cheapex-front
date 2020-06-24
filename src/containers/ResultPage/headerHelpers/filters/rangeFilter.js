/* eslint react/no-multi-comp: 0, no-console: 0 */
// import '../assets/index.less';

import React from 'react';
// import Slider from '../src';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
// import './rangeStyle.css';
import classes from './filters.css';

function log(value) {
  console.log(value); //eslint-disable-line
}

class CustomizedRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // lowerBound: 20,
      // upperBound: 40,
      value: [20, 40],
      // value: 0,
    };
  }

  onLowerBoundChange = (e) => {
    this.setState({ lowerBound: +e.target.value });
  };

  onUpperBoundChange = (e) => {
    this.setState({ upperBound: +e.target.value });
  };

  onSliderChange = (value) => {
    // console.log(value);
    this.setState({
      value,
    });
  };

  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound] });
  };

  render() {
    return (
      <div className={classes.rangeTrack}>
        <Range
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          onChange={this.onSliderChange}
          // railStyle={{
          //   height: 10,
          // }}
          handleStyle={[
            {
              height: 20,
              width: 20,
              marginLeft: 10,
              marginTop: -5,
              backgroundColor: 'white',
              boxShadow: '0px 0px 5px 1px grey',
            },
            {
              height: 20,
              width: 20,
              marginLeft: -10,
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

export default CustomizedRange;
