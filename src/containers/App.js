import React, { Component } from 'react';

import classes from './App.pcss';
import declOfNum from "../functions/declOfNum";

class App extends Component {

  state = {
    totalItems: 15,
  };

  titleEnding = declOfNum(this.state.totalItems,  ['компании', 'компаний', 'компаний']);

  render () {
    return (
      <div>
        <h1>Лучшие предложения по вашему запросу от {this.state.totalItems} {this.titleEnding}</h1>
      </div>
    );
  }
}

export default App;
