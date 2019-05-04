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
    resultLinks: [],
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
    // здесь загружаем importedSheet и генерим адреса страниц - нужно замутить массив с рутами как мы делали в form, только для рут

    axios.get('https://react-app-bc4e6.firebaseio.com/importedSheet.json').then(response => {
      const resultLinks = Object.keys(response.data);
      this.setState({ 
        resultLinks: resultLinks
      });
    });
    

    axios.get('https://react-app-bc4e6.firebaseio.com/importedSheet/-LdXkMiv3D6o3KiwppPL.json').then(response => {
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
    });
  }

  titleEnding = declOfNum(this.state.totalItems, ['компании', 'компаний', 'компаний']);

  render () {
    // попытка генерации адресов
    /*
    const linksArray = this.state.resultLinks;

    if (this.state.resultLinks.length === 0) {
      return (
        <div>there is no results.</div>
      )
    }

    console.log('linksArray', linksArray);
    const resultLinks = linksArray.map(link => {
      return <li key={'links' + link}>
        <NavLink to={{ pathname: link }} className={classes.link}>Страница c результатами {link}</NavLink>
        <Route path={link}
          render={(routeProps) => (<ResultPage {...routeProps}
            data={this.state.tablerows}
            header={this.state.tableHeader.headerShort}
            link={link} />)} />
      </li>
    });

    console.log('resultLinks', resultLinks);

      */


    if (this.state.tablerows.length === 0) {
      return (
        <div>there is no data.</div>
      )
    }

    return (
      <BrowserRouter>
        <div className={classes.holder}>

          <NavLink to={{ pathname: '/' }} className={classes.link}>Страница c результатами</NavLink>
          <Route path="/"
            render={(routeProps) => (<ResultPage {...routeProps}
              data={this.state.tablerows}
              header={this.state.tableHeader.headerShort}
              link={this.state.resultLinks[2]} />)} />
          <ul>
            здесь будет список адресов  resultLinks
          </ul>
          
          <NavLink to={{ pathname: '/import' }} className={classes.link}>Страница для загрузки данных</NavLink>
          <Route path="/import" component={Form} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
