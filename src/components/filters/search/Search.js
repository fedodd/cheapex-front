import React, { useState }  from 'react';
import classes from './Search.pcss';

const search = (props) => {
  console.log('searchData', props.searchData);
  const [companies, setCount] = useState(props.searchData);
  const data = props.searchData;
  const setFilter = (filterValue) => {
    
  }
  
  return (
    <div>
      <input
        className={classes.search} 
        type="text"
        placeholder="www, ИНН, название компании, город"
        onChange={(e) => this.handleChange(e)}></input>
        
    </div>
  );
};

export default search;
