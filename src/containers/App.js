import React, { Component } from 'react';

import classes from './App.pcss';
import declOfNum from "../functions/declOfNum";

import Filters from "../components/filters/Filters";
import Table from '../components/table/Table';

class App extends Component {

  state = {
    totalItems: 15,
  };

  titleEnding = declOfNum(this.state.totalItems,  ['компании', 'компаний', 'компаний']);

  componentDidMount() {

  }

  render () {
    return (
      <div className={classes.holder}>
        <h1>Лучшие предложения по вашему запросу от {this.state.totalItems} {this.titleEnding}</h1>
        <Filters />
        <Table />
      </div>
    );
  }
}

export default App;
