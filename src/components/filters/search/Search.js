import React from 'react';
import classes from './Search.pcss';

const search = (props) => {
  
  return (
    <div>
      <input
        className={classes.search} 
        type="text"
        placeholder="www, ИНН, название компании, город"></input>
    </div>
  );
};

export default search;
