import React from 'react';
import classes from './Duration.pcss';

const duration = (props) => {
  return (
    <div className="duration">
      <div className={classes.titleLine}>
        <span>9120$ - 738$</span><span>26...55 дней</span>
      </div>
    </div>
  );
};

export default duration;
