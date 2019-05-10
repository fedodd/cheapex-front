import React, { Component } from 'react';
import ReactTable from "react-table";
//  import axios from "axios";
import './Table.pcss';
import Aux from "../../hoc/Aux";
import fixRow from "./fixRow";
//import headerHelpers from "../../containers/headerHelpers/headerHelpers";

class Table extends Component {
  state = {
    fixrowsCounter: 0,
    headerHeight: 0,
    rowHeight: 0,
    totalFixHeight: 0,
    fixrows: {
      
    }
  }

  //создаем колонки с их заголовками и уровнями для react-table
  tableColumnsHandler = (inputHeader, outputHeader) => {
    console.log('inputHeader', inputHeader, 'outputHeader', outputHeader);
    let headerMap = inputHeader.header.reduce((acc, el, index) => {
      
      // Пробуем взять элемент с нужным ключом. Элементы - объекты с value - react element и checkedName - названий колонок из исходной таблицы. под ключом checkedName будем записывать  value в acc и проверять - есть ли уже такой элемент
      let currentRow = null;
      currentRow = acc.get(el.checkedName);
     
      // Если такого ещё нет, берём пустой объект  и задаем ему свойства колонок таблицы
      if ((!currentRow)) {
        currentRow = {};
        currentRow['Header'] = el.value;
        //currentRow['accessor'] = String(index);
        currentRow['columns'] = [{ 'Header': el.value, 'accessor': String(index) }];
      } else {
        // если такая колонка уже есть, то спрашиваем - есть ли уже дочерние колонки. если нет - создаем подколонки, переместив в нижний уровень колонку с тем же названием

        //(currentRow['columns']) ? null : currentRow['columns'] = [];

        if (currentRow['columns'].length === 0) {

          currentRow.columns = currentRow.columns.concat([
            { 'Header': currentRow['Header'], 'accessor': currentRow['accessor'] },
            { 'Header': el.value, 'accessor': String(index) }]);
          currentRow['accessor'] = null;
          // если уже есть подколонки - просто добавляем ещу одну
        } else {
          currentRow.columns = currentRow.columns.concat({ 'Header': el.value, 'accessor': String(index) });
        }
      }
      // Обновляем запись с нужным ключом
      return acc.set(el.checkedName, currentRow);
    }, new Map());

    // Теперь у тебя есть map
    headerMap.forEach((value, key) => {
      outputHeader = outputHeader.concat(value);
    });

    //console.log('outputHeader', outputHeader);

    return outputHeader;
  }

  fixRowHandler = (targetClass) => {

    [...document.querySelectorAll(targetClass)].map((row, index) => {
      row.addEventListener('click', e => {
        let totalFixHeight = this.state.totalFixHeight;
        const rowHeight = this.state.rowHeight;
        console.log('totalFixHeight before', totalFixHeight, 'rowHeight', rowHeight);
        if (row.classList.contains('fixed')) {
          row.classList.remove('fixed'); 
          let acc = this.state.headerHeight;
          totalFixHeight = [...document.querySelectorAll(targetClass+'.fixed')].reduce((acc, row) => {
            row.style.top = acc + 'px';
            return acc + rowHeight;
          }, acc);
          
        } else {
          row.classList.add('fixed'); 
          row.style.top = totalFixHeight + 'px';
          totalFixHeight = totalFixHeight + rowHeight;
        }
        this.setState({ totalFixHeight: totalFixHeight });
      });
    })
    
  };

  componentDidMount () {
    this.fixRowHandler('.rt-tr-group');
    const rowHeight = document.querySelector('.rt-tr-group').offsetHeight;
    const headerHeight = document.querySelector('.rt-thead.-headerGroups').offsetHeight;
    this.setState({ 
      headerHeight: headerHeight,
      rowHeight: rowHeight,
      totalFixHeight: headerHeight
    });
  }

  render() {
    const data = this.props.data;
    // проверяем - если данные еще не загрузились -выводим пустую строку
    //создаем колонки с их заголовками и уровнями для react-table
    const tableHeader = this.tableColumnsHandler(this.props.header, []);
    

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
