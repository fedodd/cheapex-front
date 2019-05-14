import React, { Component } from 'react';
import classes from './Filters.pcss';
import RangeFilter from './rangeFilter/rangeFilter';
import Search from './search/Search';


class name extends Component {

  state = {

  };
  
  render() {
    return (
      <div className={classes.filters}>
        <Search 
          searchInputHandler={this.props.searchInputHandler}/>
        <RangeFilter 
          totalFilterHandler={this.props.totalFilterHandler}
          totalValues ={this.props.totalValues}
          rangeFilterValue={this.props.rangeFilterValue}/>
      </div>
     );
  }
};

export default name;