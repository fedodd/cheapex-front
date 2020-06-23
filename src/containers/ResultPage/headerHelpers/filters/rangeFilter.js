/* eslint react/no-multi-comp: 0, no-console: 0 */
// import '../assets/index.less';

import React from 'react';
// import Slider from '../src';
import Slider, { Range } from 'rc-slider';
import style from 'rc-slider/assets/index.css';

console.log(style);

// const { Range } = Slider;

// const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class CustomizedRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: 20,
      upperBound: 40,
      value: [20, 40],
    };
  }

  onLowerBoundChange = (e) => {
    this.setState({ lowerBound: +e.target.value });
  };

  onUpperBoundChange = (e) => {
    this.setState({ upperBound: +e.target.value });
  };

  onSliderChange = (value) => {
    log(value);
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
      <div>
        <label>LowerBound: </label>
        <input
          type="number"
          value={this.state.lowerBound}
          onChange={this.onLowerBoundChange}
        />
        <br />
        <label>UpperBound: </label>
        <input
          type="number"
          value={this.state.upperBound}
          onChange={this.onUpperBoundChange}
        />
        <br />
        <button type="button" onClick={this.handleApply}>
          Apply
        </button>
        <br />
        <br />
        <Range
          allowCross={false}
          value={this.state.value}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

export default CustomizedRange;
