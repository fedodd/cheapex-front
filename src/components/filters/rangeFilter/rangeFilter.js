import React from 'react';
import classes from './rangeFilter.pcss';
import tinygradient from "tinygradient";
//import { compile } from 'path-to-regexp';
import arrayMinMax from '../../../functions/arrayMinMax';

class RangeFilter extends React.Component {

  state = {

    gradient: tinygradient([
      '#ff0000',
      '#fdd64d',
      '#56a100'
    ]),
    generatedStyle: 'red'
  }

  thumbColorHandler = (event) => {
    this.props.totalFilterHandler(event);
    const testGrad = this.state.gradient.rgbAt(event.target.value / 100);
    const generatedStyle = 'rgb(' + testGrad._r + ',' + testGrad._g + ',' + testGrad._b + ')';
    this.setState({
      generatedStyle: generatedStyle
    });
  }

  render () {

    return (
      <div className="rangeFilter">
        <style>{`
            :root {
              --gradient: ${this.state.generatedStyle};
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
            onChange={this.thumbColorHandler}
            className={classes.slider}
            id="myRange"
             />
        </div>
      </div>
    );
  }  
};

export default RangeFilter;
