import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import classes from './App.pcss';
import declOfNum from "../functions/declOfNum";
import ResultPage from './ResultPage/ResultPage';
import Form from '../components/form/Form';
import axios from "axios";


class App extends Component {

  state = {
    resultLinks: []
  };

  componentDidMount() {
    // здесь загружаем importedSheet и генерим адреса страниц - нужно замутить массив с рутами как мы делали в form, только для рут

    axios.get('https://react-app-bc4e6.firebaseio.com/importedSheet.json').then(response => {
      const resultLinks = Object.keys(response.data);
      this.setState({ 
        resultLinks: resultLinks
      });
    });
  }

  titleEnding = declOfNum(this.state.totalItems, ['компании', 'компаний', 'компаний']);

  render () {
    // попытка генерации адресов
    
    const linksArray = this.state.resultLinks;

    if (this.state.resultLinks.length === 0) {
      return (
        <div>there is no results.</div>
      )
    }

    console.log('linksArray', linksArray);
    const resultLinks = linksArray.map(link => {
      return <li key={'links' + link}>
        <NavLink to={'/' + link} className={classes.link}>Страница c результатами {link}</NavLink>
        <Route path={'/' + link}
          render={(routeProps) => (<ResultPage {...routeProps}
            link={link} />)} />
      </li>
    });

    console.log('resultLinks', resultLinks);

    return (
      <BrowserRouter>
        <div className={classes.holder}>
          <ul>
            {resultLinks}
            
           
          </ul>
          
          <NavLink to={{ pathname: '/import' }} className={classes.link}>Страница для загрузки данных</NavLink>
          <Route path="/import" component={Form} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
