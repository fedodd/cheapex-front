import React, { Component } from 'react';
import ReactTable from "react-table";
import axios from "axios";
import './Table.pcss';
import Aux from "../../hoc/Aux";
import headerHelpers from "./headerHelpers/headerHelpers";

class Table extends Component {

  state = {
    companies: [],
    numericData: [],
    noDataCompanies: [],
    tablerows: [],
    tableHeader: {
      header: [],
      headerShort: [],
      headerToTranscript: []
    },

    fullPrice: [],
    helpersIndex: {
      connect: [],
      transcript: [],
      connectArrow: [],
      dMin: [],
      dMaxconnectDots: [],
      price: [],
      image: []
    }
  };

  componentDidMount() {
    axios.get('https://react-app-bc4e6.firebaseio.com/importedSheet/-Lcw7iekBhFuR7ui0wZ5.json').then(response => {
      const fullData = response.data.data;
      //console.log('response.data ', response.data.data);
      //console.log('fullData ', fullData);     
    
      const data = headerHelpers(fullData);

      this.setState({
        numericData: data.numericData,
        tablerows: data.tablerows,
        tableHeader: data.tableHeader
      });
    });
  }

  //создаем колонки с их заголовками и уровнями для react-table
  tableColumnsHandler = (inputHeader, outputHeader) => {
    let headerMap = inputHeader.reduce((acc, el, index) => {
      // Пробуем взять элемент с нужным ключом
      let currentRow = acc.get(el);
      // Если такого ещё нет, берём пустой объект  и задаем ему свойства колонок таблицы
      if (!currentRow) {
        currentRow = {};
        currentRow['Header'] = el;
        //currentRow['accessor'] = String(index);
        currentRow['columns'] = [{ 'Header': el, 'accessor': String(index) }];
      } else {
        // если такая колонка уже есть, то спрашиваем - есть ли уже дочерние колонки. если нет - создаем подколонки, переместив в нижний уровень колонку с тем же названием

        //(currentRow['columns']) ? null : currentRow['columns'] = [];

        if (currentRow['columns'].length === 0) {

          currentRow.columns = currentRow.columns.concat([
            { 'Header': currentRow['Header'], 'accessor': currentRow['accessor'] },
            { 'Header': el, 'accessor': String(index) }]);
          currentRow['accessor'] = null;
          // если уже есть подколонки - просто добавляем ещу одну
        } else {
          currentRow.columns = currentRow.columns.concat({ 'Header': el, 'accessor': String(index) });
        }
      }
      // Обновляем запись с нужным ключом
      return acc.set(el, currentRow);
    }, new Map());

    // Теперь у тебя есть map
    headerMap.forEach((value, key) => {
      outputHeader = outputHeader.concat(value);
    });

    return outputHeader;
  }



  render() {
    
    const data = this.state.tablerows;
    // проверяем - если данные еще не загрузились -выводим пустую строку
    if (data.length === 0) {
      return (
        <div>there is no data.</div>
      )
    }

    //создаем колонки с их заголовками и уровнями для react-table
    const headerFromData = this.state.tableHeader.headerShort;
    const tableHeader = this.tableColumnsHandler(headerFromData, []);
    
    
    return (
      <Aux>
        <ReactTable 
          data={data}   
          columns={tableHeader}
          showPaginationBottom={false}      
          defaultPageSize={data.length}  
          />
      </Aux>
     );
  }
};

export default Table;
