import React, { Component } from 'react';
import axios from "axios";
//import { Route } from 'react-router-dom';
import Filters from "../../components/filters/Filters";
import headerHelpers from "../headerHelpers/headerHelpers";
import Table from '../../components/table/Table';
import classes from './ResultPage.pcss';
import declOfNum from "../../functions/declOfNum";
import matchSorter from 'match-sorter';

class ResultPage extends Component {

  state= {
    companies: ['one', 'two', 'three'],
    numericData: [],
    noDataCompanies: [],
    tablerows: [],
    tableHeader: {
      header: [],
      headerShort: [],
      headerToTranscript: []
    },
    fullPrice: [],
    totalItems: 0 
  }

  componentDidMount () {
    console.log('result page mount!');
    
    const fullpath = 'https://react-app-bc4e6.firebaseio.com/importedSheet/' + this.props.link + '.json';
    axios.get(fullpath).then(response => {
      const fullData = response.data.data;
      const data = headerHelpers(fullData);
      const companies = {};
      data.tablerows.map((row, index) => {
        companies[index] = row[0];
      });
      
      

      this.setState({
        numericData: data.numericData,
        tablerows: data.tablerows,
        tableHeader: data.tableHeader,
        totalItems: data.tablerows.length,
        companies: companies
      });
    }).catch(error => {
      console.log('error!', error);
      alert('error!');
      // здесь надо прописать сценарии по ошибкам. а где-тоо выше - ловить ошибки - например файл не в том формате или типа того
    });
  }
  
  //склонения к слову 
  titleEnding = declOfNum(this.state.totalItems, ['компании', 'компаний', 'компаний']);


// функция по фильтрации по поиску. передаем ее в компонент search и возвращаем оттуда event из инпута. 
  searchFilterHandler = (event) => {

    const rows = this.state.tablerows;
    const targetString = event.target.value.toLowerCase();
// соберем индексы отфильтрованных значений
    const filteredCompanies = rows.reduce((acc, row, index) => {
      const toLowerCaseCompany = row[0].toLowerCase();
      return toLowerCaseCompany.includes(targetString) ? [...acc, index] : acc;
    }, []);
// возьмем наши ряды из дома и если индекс не совпадает - вешаем класс
    const nodeRows = document.querySelectorAll('.rt-tr-group');
    [...nodeRows].map((row, index) => {
      if (filteredCompanies.includes(index)) {
        row.classList.remove('filtered__out');
      } else {
        row.classList.add('filtered__out');
      }
       
    })
  }
  
  render() {

    if (this.state.tablerows.length === 0) {
      return (
        <div>loading...</div>
      )
    }
    return (
      <div className={classes.resultPage}>
        <h1>Лучшие предложения по вашему запросу от {this.state.totalItems} {this.titleEnding}</h1>
        <Filters 
          searchInputHandler={this.searchFilterHandler}/>
        <Table
          data={this.state.tablerows}
          header={this.state.tableHeader} />
      </div>
    )
  }
};

export default ResultPage;
