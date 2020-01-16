import React, { Component } from 'react';
import axios from "axios";
//import { Route } from 'react-router-dom';
import Filters from "../../components/filters/Filters";
import headerHelpers from "./headerHelpers/headerHelpers2";
import Table from '../../components/table/Table2';
import classes from './ResultPage.pcss';
import declOfNum from "../../functions/declOfNum";
import {
  useTable,
} from "react-table";
//import filterByValue from "../../functions/filterByValue";
import arrayMinMax from '../../functions/arrayMinMax';
import deepCopyArray from "../../functions/deepCopyArray";
import Spinner from "../../components/spinner/Spinner";
import clickDrugHandler from "../../functions/clickDrug";


class ResultPage extends Component {

    state={
      error: false,
      columns: [],
      data: []
    }

    componentWillMount() {

      //const fullData =


    const fullpath = 'https://react-app-bc4e6.firebaseio.com/importedSheet/' + this.props.link + '.json';
    axios.get(fullpath).then(response => {
      const fullData = response.data.data;

      let results = headerHelpers(fullData);

      console.log(results);
      let columns = Object.values(results.columns);

      /* важно: мы сами генерируем последние три колонки и обращаемся к ним по индексам: -1 цена, -2 максдней, -3 миндней.  важно не сломать эту штуку:)*/

      // let tagColumns = columns.map(column => {
      // let resultCell = <span className="test" key={column.Header}>{column.Header}</span>

      //   return {
      //     ...column,
      //     Header: resultCell,
      //   }

      // })



      this.setState({
        columns: columns,
        data: results.data
      });
    }).catch(error => {
      console.log('error!', error);
      alert('error!');
      this.setState({ error: true });
      // здесь надо прописать сценарии по ошибкам. а где-тоо выше - ловить ошибки - например файл не в том формате или типа того
    });
  }

  render() {


    return (
      <div>
        <Table columns={this.state.columns} data={this.state.data} />
      </div>
    );
  }
}

export default ResultPage;
