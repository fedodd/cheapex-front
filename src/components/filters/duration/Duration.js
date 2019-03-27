import React from 'react';
import classes from './Duration.pcss';

const duration = (props) => {
  return (
    <div className="duration">
      <div className="_56Kl- ">
        <div className={classes.titleLine}><span>9120$ - 738$</span><span>26...55 дней</span></div>
        <div aria-disabled="false" className="_3LzRf">
          <div className={classes.sliderLine}>
            <div className="_3UMCx" style={{left: '0%', width: '28.2051%'}}></div>
            <span style={{ position: 'absolute', left: '28.2051%'}}>
              <div 
                aria-valuemax="130000" 
                aria-valuemin="13000" 
                aria-valuenow="46000" 
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
