import React, { Component } from 'react';
import axios from "axios";
//import { Route } from 'react-router-dom';
import Filters from "../../components/filters/Filters";
import headerHelpers from "./headerHelpers/headerHelpers";
import Table from '../../components/table/Table';
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
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
  }

  state= {
    error: false,
    indexData: [],
    fixedIndexArray: [],
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
    rangeFilterValue: null,
    pageHeight: 'auto'
  }

  minMaxHandler = (numericDataBefore, filteredRows, totalValues) => {
    const targetIndexes = filteredRows.map(row => row[0]);
    const numericData = numericDataBefore.filter((row, index) => targetIndexes.includes(index + 1));
    const totalPriceArray = numericData.map(row => row[row.length - 1]);
    const dMaxArray = numericData.map(row => row[row.length - 2]);
    const dMinArray = numericData.map(row => row[row.length - 3]);
    const maxPrice = arrayMinMax(totalPriceArray, 'max');
    const minPrice = arrayMinMax(totalPriceArray, 'min');
    const dMax = arrayMinMax(dMaxArray, 'max');
    const dMin = arrayMinMax(dMinArray, 'min');
    const rangeStep = (totalValues.rangeStep === 0) ? (maxPrice - minPrice) / 100 : totalValues.rangeStep;
    const rangeValue = (totalValues.rangeValue === 0) ? maxPrice : totalValues.rangeValue;

    return {
      totalPriceArray: totalPriceArray,
      dMaxArray: dMaxArray,
      dMinArray: dMinArray,
      maxPrice: maxPrice,
      minPrice: minPrice,
      dMax: dMax,
      dMin: dMin,
      rangeStep: rangeStep,
      rangeValue: rangeValue
    }
  }

  //склонения к слову
  titleEnding = declOfNum(this.state.totalItems, ['компании', 'компаний', 'компаний']);

// фильтрация по поиску. передаем ее в компонент search и возвращаем оттуда event из инпута.
  searchFilterHandler = (rows, event) => {
    let targetString = '';
    // if (event === undefined) {
    //   targetString = document.getElementById('searchFilter').value;
    // }  else {
    //   targetString = event.target.value.toLowerCase();
    // }

    if (event !== undefined) {
      targetString = event.target.value.toLowerCase();
    }

    const noDataRows = this.state.noDataCompanies;
    const filteredRows = rows.filter(row => {
    //row[1] - сайт компании
      return row[1].props.children.toLowerCase().includes(targetString);
    });

    const filteredNoDataRows = noDataRows.filter(row => {
      return row[1].props.children.toLowerCase().includes(targetString);
    });

    this.setState({
      filteredNoDataCompanies: filteredNoDataRows
    });

    return filteredRows;
  }

  //фильтрация поrange scrollbar. получаем значение, конвертируем в Price, записываем контрольное значение

  totalFilterHandler = (rows, event, numericData, totalValues) => {
    let targetValue = 0;

    if (event === null) {
      // targetValue = document.getElementById('rangeFilter').value;
      targetValue = 0;
    } else {
      targetValue = event.target.value;
    }

    totalValues.rangeValue = Math.round(totalValues.minPrice + (100 - targetValue) * totalValues.rangeStep);
    const filteredRows = rows.filter((row, index) => (numericData[index][numericData[index].length - 1] <= totalValues.rangeValue));

    return filteredRows;
  }

  complexFilterHandler = (event) => {

    let rows = this.state.tablerows;
    const numericData = this.state.numericData;
    const totalValues = this.state.totalValues;
    switch (event.target.id) {
      case "searchFilter":
        rows = this.totalFilterHandler(rows, null, numericData, totalValues);
        rows = this.searchFilterHandler(rows, event);
        break;
      case "rangeFilter":
        rows = this.totalFilterHandler(rows, event, numericData, totalValues);
        rows = this.searchFilterHandler(rows);
        break;
      default:;
    }

    const updatedValues = this.minMaxHandler(numericData, rows, totalValues);

    this.setState({
      filteredRows: rows,
      totalValues: updatedValues
    });
  }

  addFixedRowHandler = (index) => {
    let fixedIndexArray = [...this.state.fixedIndexArray];
    const checkIndex = fixedIndexArray.indexOf(index);
    (checkIndex === -1) ? fixedIndexArray.push(index) : fixedIndexArray.splice(checkIndex, 1);
    fixedIndexArray.sort(function (a, b) {
      return a - b;
    });
    this.setState({
      fixedIndexArray: fixedIndexArray
    });
  }

  componentWillMount() {
    const fullpath = 'https://react-app-bc4e6.firebaseio.com/importedSheet/' + this.props.link + '.json';
    axios.get(fullpath).then(response => {
      const fullData = response.data.data;

      const data = headerHelpers(fullData);
      /* важно: мы сами генерируем последние три колонки и обращаемся к ним по индексам: -1 цена, -2 максдней, -3 миндней.  важно не сломать эту штуку:)*/

      const numericData = data.numericData;
      const filteredRows = deepCopyArray(data.tablerows);

      const totalValues = this.minMaxHandler(numericData, filteredRows, this.state.totalValues);
      this.setState({
        numericData: data.numericData,
        tablerows: data.tablerows,
        tableHeader: data.tableHeader,
        indexData: data.exportData,
        filteredRows: filteredRows,
        totalItems: data.tablerows.length,
        noDataCompanies: data.noDataCompanies,
        filteredNoDataCompanies: data.noDataCompanies,
        totalValues: totalValues,
        columnsWidth: data.columnsWidth
      });
    }).catch(error => {
      console.log('error!', error);
      alert('error!');
      this.setState({ error: true });
      // здесь надо прописать сценарии по ошибкам. а где-тоо выше - ловить ошибки - например файл не в том формате или типа того
    });
  }

  componentDidMount () {
    window.addEventListener("resize", e => setTimeout(e => clickDrugHandler(this.sliderRef.current), 100), false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tablerows.length !== this.state.tablerows.length) {
      clickDrugHandler(this.sliderRef.current);
    }
    let currentHeight = this.sliderRef.current.offsetHeight;
    if (prevProps.pageHeight !== this.state.pageHeight && this.state.pageHeight !== currentHeight) {
      this.setState({
        pageHeight: currentHeight
      })
    }
  }


  render() {
    if (this.state.tablerows.length === 0) {
      return (
        <div className={classes.resultPage}>
          <Spinner />
        </div>
      )
    }

    const noDataCompanies = this.state.filteredNoDataCompanies;
    //noDataCompanies.map((row, index) => row[0] = this.state.filteredRows.length + 1 + index);
    noDataCompanies.map(row => row[0] = null);

    let noDataCompaniesTable =
          (<ReactTable
            data={noDataCompanies}
            columns={[{
              'Header': '№',
              'accessor': '0',
              'minWidth': 44,
              'width': 54
            }, {
              'Header': 'Вебсайт',
              'accessor': '1',
              'width': 164
            },
              {
                'Header': 'Ответили',
                'accessor': '2',
                'minWidth': 40,
                'width': 'auto'
              }
            ]}
            showPaginationBottom={false}
            defaultPageSize={1}
            pageSize={noDataCompanies.length}
            className="table __noData"
            />);


    return (
      <div className={classes.resultPageWrapper}>
        <h1>Лучшие предложения по вашему запросу от {this.state.totalItems} {this.titleEnding}</h1>
        <Filters
          filterHandler={this.complexFilterHandler}
          totalValues={this.state.totalValues} />
        <div className={classes.resultPage} ref={this.sliderRef} style={{ height: this.state.pageHeight}}>
          <Table
            data={this.state.filteredRows}
            header={this.state.tableHeader}
            loading={true}
            className="table __main"
            addFixedRowHandler={this.addFixedRowHandler}
            fixedRows={this.state.fixedIndexArray}
            columnsWidth={this.state.columnsWidth}
            />
          {/*noDataCompaniesTable*/}
        </div>
      </div>
    )
  }
};

export default ResultPage;
