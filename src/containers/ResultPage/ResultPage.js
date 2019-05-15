import React, { Component } from 'react';
import axios from "axios";
//import { Route } from 'react-router-dom';
import Filters from "../../components/filters/Filters";
import headerHelpers from "../headerHelpers/headerHelpers";
import Table from '../../components/table/Table';
import classes from './ResultPage.pcss';
import declOfNum from "../../functions/declOfNum";
import ReactTable from "react-table";

class ResultPage extends Component {

  state= {
    companies: [],
    numericData: [],
    noDataCompanies: [],
    noDataHeader: [],
    tablerows: [],
    tableHeader: {
      header: [],
      headerShort: [],
      headerToTranscript: []
    },
    fullPrice: [],
    totalItems: 0,
    totalValues: {
      totalPriceArray:[],
      dMaxArray: [],
      dMinArray: []
    },
    rangeFilterValue: null
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

      const numericData = data.numericData;
      const totalPriceArray = numericData.map(row => row[row.length -1]);
      const dMaxArray = numericData.map(row => row[row.length - 2]);
      const dMinArray = numericData.map(row => row[row.length - 3]);
      
      this.setState({
        numericData: data.numericData,
        tablerows: data.tablerows,
        tableHeader: data.tableHeader,
        totalItems: data.tablerows.length,
        noDataCompanies: data.noDataCompanies,
        companies: companies,
        totalValues: {
          totalPriceArray: totalPriceArray,
          dMaxArray: dMaxArray,
          dMinArray: dMinArray
        } 
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
    const noDataRows = this.state.noDataCompanies;
    const targetString = event.target.value.toLowerCase();
// соберем индексы отфильтрованных значений
// здесь нужно сделать одну функцию и заводить в нее main и noData таблицы
    const filteredCompanies = rows.reduce((acc, row, index) => {
      const toLowerCaseCompany = row[0].toLowerCase();
      return toLowerCaseCompany.includes(targetString) ? [...acc, index] : acc;
    }, []);

    const filteredNoDataCompanies = noDataRows.reduce((acc, row, index) => {
      const toLowerCaseCompany = row[0].toLowerCase();
      return toLowerCaseCompany.includes(targetString) ? [...acc, index] : acc;
    }, []);
// возьмем наши ряды из дома и если индекс не совпадает - вешаем класс
    
    const nodeRows = document.querySelectorAll('.__main .rt-tr-group');
    const noDataNodeRows = document.querySelectorAll('.__noData .rt-tr-group');
    [...nodeRows].map((row, index) => {
      if (filteredCompanies.includes(index)) {
        row.classList.remove('filtered__out');
      } else {
        row.classList.add('filtered__out');
      }
    });

    [...noDataNodeRows].map((row, index) => {
      if (filteredNoDataCompanies.includes(index)) {
        row.classList.remove('filtered__out');
      } else {
        row.classList.add('filtered__out');
      }
    });
  }

  totalFilterHandler = (event) => {
    
    const dataMin = this.state.totalValues.dMinArray;
    const dataMax = this.state.totalValues.dMaxArray;
    const rangeFilterValue = event.target.value;

    this.setState({
      rangeFilterValue: rangeFilterValue
    });
    const data = this.state.numericData;
    const rows = this.state.tablerows;

  }
  
  render() {

    if (this.state.tablerows.length === 0) {
      return (
        <div>loading...</div>
      )
    }

    let noDataCompaniesTable = null;
    const noDataCompanies = this.state.noDataCompanies;

    if (noDataCompanies.length !== 0) {
      noDataCompaniesTable = 
        <div>
          <h2>Не ответили:</h2>
          <ReactTable 
            data={noDataCompanies}
            columns={[{
              'Header': 'вебсайт', 
              'accessor': '0',
              'width': '150'  
            },
              {
                'Header': 'ответили',
                'accessor': '1',
                'width': 'underfined'
              }
            ]}
            showPaginationBottom={false}
            defaultPageSize={noDataCompanies.length} 
            className="table __noData"/>
        </div>
    }

    return (
      <div className={classes.resultPage}>
        <h1>Лучшие предложения по вашему запросу от {this.state.totalItems} {this.titleEnding}</h1>
        <Filters 
          searchInputHandler={this.searchFilterHandler}
          totalFilterHandler={this.totalFilterHandler}
          totalValues={this.state.totalValues}/>
        <Table
          data={this.state.tablerows}
          header={this.state.tableHeader}
          className="table __main" />
        {noDataCompaniesTable}
      </div>
    )
  }
};

export default ResultPage;
