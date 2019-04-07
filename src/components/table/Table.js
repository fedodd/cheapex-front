import React, { Component } from 'react';
import ReactTable from "react-table";
import axios from "axios";
import './Table.pcss';


class Table extends Component {

  state = {
    companies: [],
    tablerows: [],
    tableHeader: [],
    tableHeaderShort: []
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
    
    let tableHeader = [];
    const headerFromData = this.state.tableHeader;
    console.log('headerFromData ', headerFromData );

    const headerMap = headerFromData.reduce((acc, el, index) => {
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
            { 'Header': currentRow['Header'], 'accessor': currentRow['accessor']},
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
    console.log([...headerMap]);
    headerMap.forEach((value, key) => {
      tableHeader = tableHeader.concat(value);
    });
    
    console.log('tableHeader:  ', tableHeader);
    return (
      
      <div>
        {console.log(data, tableHeader[0])}
        <ReactTable 
          data={data}   
          columns={tableHeader}          
          />
      </div>
     );
  }
};

export default Table;
