import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'


//import Header from './Header/Header';
//import Row from './Row/Row';
import classes from './Table.pcss';


class Table extends Component {

  state = {
    companies: [],
    tablerows: []
  };

  componentDidMount() {
    fetch('http://localhost:4000/').then(res => res.json()).then(res => this.setState({companies: res}));
    fetch('http://localhost:4000/').then(res => res.json()).then(res => this.setState({ tablerows: res }));
  }
  
  render() {
    return (
      <div>
        {this.state.tablerows.map((row, index) => {
          return (
            <div className={classes.row}>{
              Object.keys(row).map(key => {
                if (key !== '_id' && key !== '__v') {
                  return <span className={classes.cell}>{row[key]}</span>
                }
                return null;
              })
            }</div>
          )
        })}
      </div>
     );
  }
};

export default Table;
