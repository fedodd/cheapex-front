import React, { Component } from 'react';
import axios from "axios";
import { Route } from 'react-router-dom';
import Filters from "../../components/filters/Filters";
import Table from '../../components/table/Table';
import classes from './ResultPage.pcss';

class ResultPage extends Component {

  state= {
    totalItems: 15 
  }

  componentDidMount () {
    console.log('result page mount!');

    /*axios.get('https://react-app-bc4e6.firebaseio.com/importedSheet/-LdXkMiv3D6o3KiwppPL.json').then(response => {
      const fullData = response.data.data;
      //console.log(fullData);
      const data = headerHelpers(fullData);

      this.setState({
        numericData: data.numericData,
        tablerows: data.tablerows,
        tableHeader: data.tableHeader
      });
    }).catch(error => {
      console.log('error!');
      alert('error!');
      // здесь надо прописать сценарии по ошибкам. а где-тоо выше - ловить ошибки - например файл не в том формате или типа того
    }); */
  }
  
  
  render() {
    console.log('header', this.props.header);
    //console.log('render resultpage: ', this.props.link)
    return (
      <div className={classes.resultPage}>
        <h1>Лучшие предложения по вашему запросу от {this.state.totalItems} {this.titleEnding}</h1>
        <Filters />
        <Table
          data={this.props.data}
          header={this.props.header} />
      </div>
    )
  }
};

export default ResultPage;
