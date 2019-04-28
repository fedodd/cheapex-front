import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Filters from "../../components/filters/Filters";
import Table from '../../components/table/Table';
import classes from './ResultPage.pcss';

class ResultPage extends Component {

  state= {
    totalItems: 15 
  }

  componentDidMount () {
    //console.log('result page mount!');
  }
  
  render() {

    return (
      <div className={classes.resultPage}>
        <h1>Лучшие предложения по вашему запросу от {this.state.totalItems} {this.titleEnding}</h1>
        <Filters />
        <Route path="/import" component={Table} />
        <Table
          data={this.props.data}
          header={this.props.header} />
      </div>
    )
  }
};

export default ResultPage;
