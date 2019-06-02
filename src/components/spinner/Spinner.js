import React from 'react';
import classes from './Spinner.pcss';


const spinner = (props) => (
  
  <div className={classes.loadSpinnerModal}>
    <div className={classes.Loader}>Loading...</div>
  </div>
);

export default spinner;
