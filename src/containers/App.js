import React, { Component } from 'react';

import classes from './App.pcss';
import declOfNum from "../functions/declOfNum";
import Filters from "../components/filters/Filters";
import Table from '../components/table/Table';
import Form from '../components/form/Form';
import axios from "axios";
import headerHelpers from "./headerHelpers/headerHelpers";

class App extends Component {

  state = {
    companies: [],
    numericData: [],
    noDataCompanies: [],
    tablerows: [],
    tableHeader: {
      header: [],
      headerShort: [],
      headerToTranscript: []
    },

    fullPrice: [],
    helpersIndex: {
      connect: [],
      transcript: [],
      connectArrow: [],
      dMin: [],
      dMaxconnectDots: [],
      price: [],
      image: []
    },
    totalItems: 15 
  };

  componentDidMount() {
    axios.get('https://react-app-bc4e6.firebaseio.com/importedSheet/-LcyxfNqNGjdklXJcR-D.json').then(response => {
      const fullData = response.data.data;
      //console.log('response.data ', response.data.data);
      //console.log('fullData ', fullData);     

      const data = headerHelpers(fullData);

      this.setState({
        numericData: data.numericData,
        tablerows: data.tablerows,
        tableHeader: data.tableHeader
      });
    });
  }

  titleEnding = declOfNum(this.state.totalItems, ['компании', 'компаний', 'компаний']);

  render () {

    if (this.state.tablerows.length === 0) {
      return (
        <div>there is no data.</div>
      )
    }

    return (
      <div className={classes.holder}>
        <h1>Лучшие предложения по вашему запросу от {this.state.totalItems} {this.titleEnding}</h1>
        <Filters />
        <Table 
          data={this.state.tablerows}
          header={this.state.tableHeader.headerShort}/>
        <Form />
      </div>
    );
  }
}

export default App;
