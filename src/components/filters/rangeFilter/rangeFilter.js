import React from 'react';
import classes from './rangeFilter.pcss';

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
  let value = 60;
  
  console.log(value, dMin);
  
  return (
    <div className="rangeFilter">
      <div className={classes.titleLine}><span>{maxPrice}$ - {minPrice}$</span><span>{dMin}...{dMax} дней</span></div>
      <div className="slideContainer">
        <input 
          type="range" 
          min={dMin} 
          max={dMax} 
          defaultValue={dMin}
          onChange={props.totalFilterHandler}
          className={classes.slider} 
          id="myRange" />
      </div>
    </div>
  );
};

export default rangeFilter;
