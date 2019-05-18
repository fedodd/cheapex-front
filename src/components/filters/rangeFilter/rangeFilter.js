import React from 'react';
import classes from './rangeFilter.pcss';
import tinygradient from "tinygradient";
//import { compile } from 'path-to-regexp';
//import arrayMinMax from '../../../functions/arrayMinMax';

class RangeFilter extends React.Component {

  state = {

    gradient: tinygradient([
      '#ff0000',
      '#fdd64d',
      '#56a100'
    ]),
    generatedStyle: 'red',
    value: 0
  }

  thumbColorHandler = (event) => {
    this.props.filterHandler(event);
    this.setState({
      generatedStyle: this.state.gradient.rgbAt(event.target.value / 100),
      value: event.target.value
    });
  }


  render () {

    return (
      <div className="rangeFilter">
        <style>{`
            :root {
              --gradient: ${this.state.generatedStyle};
              --rangeFilterValue: ${this.state.value}
              }
            `}
        </style>
        <div className={classes.titleLine}><span>{this.props.totalValues.maxPrice}$ - {this.props.totalValues.minPrice}$</span><span>{this.props.totalValues.dMin}...{this.props.totalValues.dMax} дней</span></div>
        <div className="slideContainer">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            step="2"
            onInput={this.thumbColorHandler}
            className={classes.slider}
            id="rangeFilter"
             />
        </div>
      </div>
    );
  }  
};

export default RangeFilter;
