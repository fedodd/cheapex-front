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
        <NavLink to={{ pathname: link }} className={classes.link}>Страница c результатами {link}</NavLink>
        <Route path={link}
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
            
            <NavLink to={{ pathname: '-LdXiDvIqWaLZ_56uFfU' }} className={classes.link}>Страница c результатами -LdXiDvIqWaLZ_56uFfU</NavLink>
            <Route path='/-LdXiDvIqWaLZ_56uFfU'
              render={(routeProps) => (<ResultPage {...routeProps}

                link='-LdXiDvIqWaLZ_56uFfU' />)} />
            
            <NavLink to={{ pathname: "/-LdXiFGMYbhR3Hdihg5A" }} className={classes.link}>Страница c результатами "-LdXiFGMYbhR3Hdihg5A"</NavLink>
            <Route path="/-LdXiFGMYbhR3Hdihg5A"
              render={(routeProps) => (<ResultPage {...routeProps}

                link="-LdXiFGMYbhR3Hdihg5A" />)} />
            
            <NavLink to={{ pathname: "/-LdXkMiv3D6o3KiwppPL" }} className={classes.link}>Страница c результатами "-LdXkMiv3D6o3KiwppPL"</NavLink>
            <Route path="/-LdXkMiv3D6o3KiwppPL"
              render={(routeProps) => (<ResultPage {...routeProps}

                link="-LdXkMiv3D6o3KiwppPL" />)} />
            
            <NavLink to={{ pathname: "/-Le2_XOLNcXBWvtZ7EjD" }} className={classes.link}>Страница c результатами "-Le2_XOLNcXBWvtZ7EjD"</NavLink>
            <Route path="/-Le2_XOLNcXBWvtZ7EjD"
              render={(routeProps) => (<ResultPage {...routeProps}

                link="-Le2_XOLNcXBWvtZ7EjD" />)} />
          </ul>
          
          <NavLink to={{ pathname: '/import' }} className={classes.link}>Страница для загрузки данных</NavLink>
          <Route path="/import" component={Form} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
