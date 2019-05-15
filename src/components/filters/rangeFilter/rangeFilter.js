import React from 'react';
import classes from './rangeFilter.pcss';
import tinygradient from "tinygradient";
//import { compile } from 'path-to-regexp';
import arrayMinMax from '../../../functions/arrayMinMax';

class RangeFilter extends React.Component {

  state = {
    totalPrice: this.props.totalValues.totalPriceArray,
    dMaxArray: this.props.totalValues.dMaxArray,
    dMinArray: this.props.totalValues.dMinArray,
    maxPrice: null,
    minPrice: null,
    dMax: null,
    dMin: null,
    rangeValue: null,
    rangeStep: null,
    gradient: tinygradient([
      '#ff0000',
      '#fdd64d',
      '#56a100'
    ]),
    generatedStyle: 'red'
  }

  componentDidMount () {
    const maxPrice = arrayMinMax(this.state.totalPrice, 'max');
    const minPrice = arrayMinMax(this.state.totalPrice, 'min');
    const dMax = arrayMinMax(this.state.dMaxArray, 'max');
    const dMin = arrayMinMax(this.state.dMinArray, 'min');
    const rangeStep = (maxPrice - minPrice) / 100;
    

    this.setState({
      maxPrice: maxPrice,
      minPrice: minPrice,
      dMax: dMax,
      dMin: dMin,
      rangeStep: rangeStep
    });
  }

  thumbColorHandler = (event) => {
    let testGrad = this.state.gradient.rgbAt(event.target.value / 100);
    const generatedStyle = 'rgb(' + testGrad._r + ',' + testGrad._g + ',' + testGrad._b + ')';
    this.setState({
      rangeValue: (this.state.minPrice + (100 - event.target.value) * this.state.rangeStep ),
      generatedStyle: generatedStyle});
  }

  render () {

    let gradientCSS = { 'background': this.state.gradient.css() };
    
    return (
      <div className="rangeFilter">
        <style>{`
            :root {
              --gradient: ${this.state.generatedStyle};
              }
            `}
        </style>
        <div className={classes.titleLine}><span>{this.state.maxPrice}$ - {this.state.minPrice}$</span><span>{this.state.dMin}...{this.state.dMax} дней</span></div>
        <div className="slideContainer">
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={0}
            onChange={this.thumbColorHandler}
            className={classes.slider}
            id="myRange"
            style={gradientCSS} />
        </div>
      </div>
    );
  }

  
};

export default RangeFilter;
