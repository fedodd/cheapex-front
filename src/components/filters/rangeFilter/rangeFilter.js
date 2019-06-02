import React from 'react';
import classes from './rangeFilter.pcss';
import tinygradient from "tinygradient";
//import { compile } from 'path-to-regexp';
//import arrayMinMax from '../../../functions/arrayMinMax';

class RangeFilter extends React.Component {

  state = {
    maxPrice: this.props.totalValues.maxPrice,
    minPrice: this.props.totalValues.minPrice,
    dMin: this.props.totalValues.dMin,
    dMax: this.props.totalValues.dMax,
    gradient: tinygradient([
      '#ff0000',
      '#fdd64d',
      '#56a100'
    ]),
    generatedStyle: '#ff0000',
    trackGradient: 'linear-gradient(90deg, #ff0000, #fdd64d 47%, #56a100)',
    value: 0
  }

  thumbColorHandler = (event) => {
    this.props.filterHandler(event);
    const generatedStyle = this.state.gradient.rgbAt(event.target.value / 100);
    let trackGradient = this.state.trackGradient; 
    if ((event.target.value) < 47) {
      trackGradient = 'linear-gradient(90deg, #dbdbdb, #dbdbdb ' + event.target.value + '%, ' + generatedStyle + ' ' + event.target.value + '%, #fdd64d 47%, #56a100)';
    } else {
      trackGradient = 'linear-gradient(90deg, #dbdbdb, #dbdbdb ' + event.target.value + '%, ' + generatedStyle + ' ' + event.target.value + '%, #56a100)';
    }
    this.setState({
      generatedStyle: generatedStyle,
      value: event.target.value,
      trackGradient: trackGradient
    });
  }

  componentDidUpdate(prevProps) {
    // запускаем спиннер с задежкой если изменидись данные в таблице
    if (this.props!== prevProps) {
      this.setState({
        maxPrice: this.props.totalValues.maxPrice,
        minPrice: this.props.totalValues.minPrice,
        dMin: this.props.totalValues.dMin,
        dMax: this.props.totalValues.dMax,
      })
    }
  }

  render () {

    return (
      <div className="rangeFilter">
        <style>{`
            :root {
              --gradient: ${this.state.generatedStyle};
              --rangeFilterValue: ${this.state.value};
              --trackGradient: ${this.state.trackGradient}
              }
            `}
        </style>
        <h2 className={classes.titleLine}><span>{this.state.maxPrice}$ - {this.state.minPrice}$</span><span>{this.state.dMin}...{this.state.dMax} дней</span></h2>
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
