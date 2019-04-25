import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import classes from './App.pcss';
import declOfNum from "../functions/declOfNum";
import ResultPage from './ResultPage/ResultPage';
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
      <BrowserRouter>
        <div className={classes.holder}>
          <NavLink to={{ pathname: '/-LcyxfNqNGjdklXJcR-D' }}>Страница c результатами</NavLink>
          
          <Route path="/-LcyxfNqNGjdklXJcR-D" 
            render={(routeProps) => (<ResultPage {...routeProps} 
            data={this.state.tablerows}
            header={this.state.tableHeader.headerShort}/>)}/>

          <NavLink to={{pathname: '/import'}}>Страница для загрузки данных</NavLink>
          <Route path="/import" component={Form} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
