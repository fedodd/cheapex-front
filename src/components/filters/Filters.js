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
          filterHandler={this.props.filterHandler}/>
        <RangeFilter 
          filterHandler={this.props.filterHandler}
          totalValues ={this.props.totalValues}/>
      </div>
     );
  }
};

export default name;