import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import axios from "axios";


//import Header from './Header/Header';
//import Row from './Row/Row';
//import classes from './Table.pcss';


class Table extends Component {

  state = {
    companies: [],
    tablerows: [],
    tableHeader: []
  };

  componentDidMount() {
  axios.get('http://localhost:4000/').then(response => {
    /* Обработать здесь - отдельно сохранить в стейт заголовок, отдельно данные, причем удалить последние две колонки */
    this.setState({ tablerows: response.data});
    console.log('componentDidMount this.state.tablerows ', this.state.tablerows);
  });
    
/*     fetch('http://localhost:4000/').then(res => res.json()).then(res => this.setState({ tablerows: res })); */
  }

  render() {
    
    const { data } = this.state.tablerows.splice(0, 2);
    console.log('data ', data);
    const tableHeader = [];
    
    const headerFromData = this.state.tablerows[0];
    console.log('headerFromData: ', headerFromData);
    
    if (typeof headerFromData === 'object' ) {
      console.log('data: ', this.state.tablerows);
      Object.keys(headerFromData).map((key, index) => {

        tableHeader[index] = { 'Header': headerFromData[key] };
      });
      console.log(tableHeader);
    }
   
    return (
      <div>
        <ReactTable 
          data={data}
          columns={tableHeader}
        />
      </div>
     );
  }
};

export default Table;


/* {
  this.state.tablerows.map((row, index) => {
    return (
      <div className={classes.row}>{
        Object.keys(row).map(key => {
          if (key !== '_id' && key !== '__v') {
            return <span className={classes.cell} key={row._id}>{row[key]}</span>
          }
          return null;
        })
      }</div>
    )
  })
} */