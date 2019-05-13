import React from 'react';
import classes from './Duration.pcss';

const duration = (props) => {

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
  let value = (40 - dMin) * 100 / (dMax - dMin);
  console.log(getMinOfArray(values.totalPriceArray));

  
  return (
    <div className="duration">
      <div className="_56Kl- ">
        <div className={classes.titleLine}><span>{maxPrice}$ - {minPrice}$</span><span>{dMin}...{dMax} дней</span></div>
        <div aria-disabled="false" className="_3LzRf">
          <div className={classes.sliderLine}>
            <div className="_3UMCx" style={{left: '0%', width: '28.2051%'}}></div>
            <span style={{ position: 'absolute', left: {value}}}>
              <div 
                aria-valuemax={dMax} 
                aria-valuemin={dMin} 
                aria-valuenow={40} 
                className={classes.sliderDot} 
                draggable="false" 
                role="slider" 
                tabIndex="0"></div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default duration;
