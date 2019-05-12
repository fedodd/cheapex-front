import React, { useState }  from 'react';
import classes from './Search.pcss';

const search = (props) => {
  
  return (
    <div>
      <input
        className={classes.search} 
        type="text"
        placeholder="www, ИНН, название компании, город"
        onChange={props.searchInputHandler}></input>
    </div>
  );
};

export default search;
