import React, { Component } from 'react';
import axios from "axios";
//import { Route } from 'react-router-dom';
import Filters from "../../components/filters/Filters";
import headerHelpers from "../headerHelpers/headerHelpers";
import Table from '../../components/table/Table';
import classes from './ResultPage.pcss';
import declOfNum from "../../functions/declOfNum";
import ReactTable from "react-table";
import filterByValue from "../../functions/filterByValue";
import arrayMinMax from '../../functions/arrayMinMax';
import deepCopyArray from "../../functions/deepCopyArray";

class ResultPage extends Component {

  state= {
    companies: [],
    numericData: [],
    noDataCompanies: [],
    filteredNoDataCompanies: [],
    noDataHeader: [],
    tablerows: [],
    tableHeader: {
      header: [],
      headerShort: [],
      headerToTranscript: []
    },
    filteredRows: [],
    fullPrice: [],
    totalItems: 0,
    totalValues: {
      totalPriceArray: [],
      dMaxArray: [],
      dMinArray: [],
      maxPrice: 0,
      minPrice: 0,
      dMax: 0,
      dMin: 0,
      rangeStep: 0,
      rangeValue: 0
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

      /* важно: мы сами генерируем последние три колонки и обращаемся к ним по индексам: -1 цена, -2 максдней, -3 миндней.  важно не сломать эту штуку:)*/

      const numericData = data.numericData;
      const filteredRows = deepCopyArray(data.tablerows);
      const totalPriceArray = numericData.map(row => row[row.length -1]);
      const dMaxArray = numericData.map(row => row[row.length - 2]);
      const dMinArray = numericData.map(row => row[row.length - 3]);

      const maxPrice = arrayMinMax(totalPriceArray, 'max');
      const minPrice = arrayMinMax(totalPriceArray, 'min');
      const dMax = arrayMinMax(dMaxArray, 'max');
      const dMin = arrayMinMax(dMinArray, 'min');
      const rangeStep = (maxPrice - minPrice) / 100;
      
      
      this.setState({
        numericData: data.numericData,
        tablerows: data.tablerows,
        tableHeader: data.tableHeader,
        filteredRows: filteredRows,
        totalItems: data.tablerows.length,
        noDataCompanies: data.noDataCompanies,
        filteredNoDataCompanies: data.noDataCompanies,
        companies: companies,
        totalValues: {
          totalPriceArray: totalPriceArray,
          dMaxArray: dMaxArray,
          dMinArray: dMinArray,
          maxPrice: maxPrice,
          minPrice: minPrice,
          dMax: dMax,
          dMin: dMin,
          rangeStep: rangeStep,
          rangeValue: maxPrice
        } 
      });
    }).catch(error => {
      console.log('error!', error);
      alert('error!');
      // здесь надо прописать сценарии по ошибкам. а где-тоо выше - ловить ошибки - например файл не в том формате или типа того
    });

    console.log('componentDidMount minPrice', this.state.totalValues.minPrice);
  }
  
  //склонения к слову 
  titleEnding = declOfNum(this.state.totalItems, ['компании', 'компаний', 'компаний']);


// фильтрация по поиску. передаем ее в компонент search и возвращаем оттуда event из инпута. 
  searchFilterHandler = (event) => {

    const rows = this.state.tablerows;
    const noDataRows = this.state.noDataCompanies;
    const targetString = event.target.value.toLowerCase();

    const filteredRows = rows.filter(row => {
      return row[0].toLowerCase().includes(targetString);
    });

    const filteredNoDataRows = noDataRows.filter(row => {
      return row[0].toLowerCase().includes(targetString);
    });

    this.setState({
      filteredRows: filteredRows,
      filteredNoDataCompanies: filteredNoDataRows
    });
    console.log(this.state.tablerows);
  }

  //фильтрация поrange scrollbar. получаем значение, конвертируем в Price, записываем контрольное значение

  totalFilterHandler = (event) => {
    const totalValues = this.state.totalValues;
    totalValues.rangeValue = Math.round(totalValues.minPrice + (100 - event.target.value) * totalValues.rangeStep);
    this.setState({
      totalValues: totalValues
    });
  }

  complexFilterHandler = (event) => {
    switch (event.target.id) {
      case "searchFilter":
        this.searchFilterHandler(event);
        break;
      case "rangeFilter":
        this.totalFilterHandler(event);
        break;
      default:;
    }
  }
  
  render() {

    if (this.state.tablerows.length === 0) {
      return (
        <div>loading...</div>
      )
    }

    let noDataCompaniesTable = null;
    const noDataCompanies = this.state.filteredNoDataCompanies;

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
          totalFilterHandler={this.complexFilterHandler}
          totalValues={this.state.totalValues}/>
        <Table
          data={this.state.filteredRows}
          header={this.state.tableHeader}
          className="table __main" />
        {noDataCompaniesTable}
      </div>
    )
  }
};

export default ResultPage;
