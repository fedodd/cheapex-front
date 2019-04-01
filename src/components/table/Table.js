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
    tableHeader: {},
    tableHeaderShort: {}
  };

  componentDidMount() {
  axios.get('http://localhost:4000/').then(response => {
    const fullData = response.data;
  
    Object.keys(fullData).map(key => {
      delete fullData[key]._id;
      delete fullData[key].__v;
    });
   
    const header = Object.values(fullData[0]);
    const headerShort = Object.values(fullData[1]);
    const data = fullData;
    data.splice(0, 2);
    this.setState({ tablerows: data,
                    tableHeaderShort: headerShort,
                    tableHeader: header });
    console.log('componentDidMount this.state.tablerows ', this.state.tablerows);
    });
  }

  render() {
    
    const data = this.state.tablerows;
    console.log('data', data);
    const tableHeader = [];
    const headerFromData = this.state.tableHeader;
    
    Object.keys(headerFromData).map((key, index) => {
      tableHeader[index] = { 'Header': headerFromData[key], accessor: key };
    });
    console.log('tableHeader', tableHeader);
   
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