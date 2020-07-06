import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import classes from "./App.pcss";

import ResultPage from "./ResultPage/ResultPage";
import Form from "../components/form/Form";
import axios from "axios";

class App extends Component {
  state = {
    resultLinks: [],
    //!!!!!!
    // resultLinks: ["-Ly5DjCqcRv6lOLFSr__"],
  };

  componentDidMount() {
    // здесь загружаем importedSheet и генерим адреса страниц - нужно замутить массив с рутами как мы делали в form, только для рут
    axios
      .get("https://react-app-bc4e6.firebaseio.com/importedSheet.json")
      .then((response) => {
        const resultLinks = Object.keys(response.data);
        this.setState({
          resultLinks: resultLinks,
        });
      });
  }

  render() {
    // попытка генерации адресов

    const linksArray = this.state.resultLinks;

    if (this.state.resultLinks.length === 0) {
      return <div>there is no results.</div>;
    }

    const resultLinks = linksArray.map((link) => {
      return (
        <li key={"links" + link}>
          <NavLink
            to={"/" + link}
            className={classes.link}
            style={{ positon: "static" }}>
            Страница c результатами {link}
          </NavLink>
        </li>
      );
    });
    const resultTables = linksArray.map((link) => {
      return (
        <Route
          path={"/" + link}
          render={(routeProps) => <ResultPage {...routeProps} link={link} />}
          key={"table" + link}
        />
      );
    });
    console.log(window.location.href);
    return (
      <BrowserRouter>
        <div className={classes.holder}>
          <Route exact path="/">
            {resultTables}
            <ul
              className={classes.navlinks}
              // style={{ position: "absolute", zIndex: "-1", top: "0" }}
            >
              {resultLinks}
            </ul>
            <NavLink
              to={{ pathname: "/import" }}
              className={classes.link}
              style={{ position: "static" }}>
              Страница для загрузки данных
            </NavLink>
          </Route>
          <Route path="/import" component={Form} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
