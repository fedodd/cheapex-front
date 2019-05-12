import React, { Component } from 'react';
import classes from './Filters.pcss';
import Duration from './../filters/duration/Duration';
import Search from './search/Search';


class name extends Component {

  state = {

  };
  
  render() {
    return (
      <div className={classes.filters}>
        <Search 
          searchInputHandler={this.props.searchInputHandler}/>
        <Duration />
      </div>
     );
  }
};

export default name;