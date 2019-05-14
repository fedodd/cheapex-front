import React from 'react';
import classes from './rangeFilter.pcss';
import tinygradient from "tinygradient";

const rangeFilter = (props) => {

  const values = props.totalValues;
  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }

  const maxPrice = getMaxOfArray(values.totalPriceArray);
  const minPrice = getMinOfArray(values.totalPriceArray);
  const dMax = getMaxOfArray(values.dMaxArray);
  const dMin = getMinOfArray(values.dMinArray);
  const rangeStep = (dMax - dMin) / 100;
  let value = 60;
  
  console.log(value, dMin);


  let gradient = tinygradient([
    '#ff0000', 
    '#fdd64d',
    '#56a100'
  ]);
  
  let gradientCSS = {'background': gradient.css()};
  gradient.css();
  let newGradinet = gradient.css();
  

  
  
  const generateColor = (position) => {
    let testGrad = gradient.rgbAt(position);
    const generatedStyle = 'rgb(' + testGrad._r + ',' + testGrad._g + ',' + testGrad._b + ')'
    return generatedStyle;
  }

  console.log(document.getElementById('myRange'));
  const resCSS = generateColor(0.2);
  
  return (
    <div className="rangeFilter">
      <style>{`
            :root {
              --gradient: ${resCSS};
              }
            `}
      </style>
      <div className={classes.titleLine}><span>{maxPrice}$ - {minPrice}$</span><span>{dMin}...{dMax} дней</span></div>
      <div className="slideContainer">
        <input 
          type="range" 
          min={dMin} 
          max={dMax} 
          defaultValue={dMin}
          onChange={props.totalFilterHandler}
          className={classes.slider} 
          id="myRange"
          style={gradientCSS} />
      </div>
    </div>
  );
};

export default rangeFilter;
