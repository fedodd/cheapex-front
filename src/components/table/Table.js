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

  getColumnWidth = (rows, accessor, headerText) => {
    const maxWidth = 200;
    const magicSpacing = 8;
    let maxLength = 0;
    const checkingRow = rows[0];
    const checkingCell = rows[0][accessor];

    if (checkingCell === checkingRow[checkingRow.length - 1] || checkingCell === checkingRow[checkingRow.length - 2]) {
      maxLength = 10;
    } else if (typeof (checkingCell) === 'object') {
      if (checkingCell.props.children) {
        const className = checkingCell.props.className;
        switch (className) {
          case "dotsConnected":
            maxLength = 9;
            break;
          case "arrowConnected":
            maxLength = 11;
            break;
          case "transcriptWrapper":
            maxLength = 6;
            break;
          default: 
            maxLength = 8; 
            //console.log('default classname', checkingCell.props);
        }
      } else {
        //console.log('wihtout children', checkingCell.props);
        maxLength = 7;
      }
    } else {
      [...rows].map(row => {
        maxLength = (`${row[accessor]}`.length > maxLength) ? maxLength = `${row[accessor]}`.length : maxLength;
        return null;
      });
    }
    
    //console.log(maxWidth, maxLength, maxLength * magicSpacing);
    return Math.min(maxWidth, maxLength * magicSpacing)
  }

  //создаем колонки с их заголовками и уровнями для react-table
  tableColumnsHandler = (inputHeader, outputHeader, data) => {
    let headerMap = inputHeader.header.reduce((acc, el, index) => {
      
      // Пробуем взять элемент с нужным ключом. Элементы - объекты с value - react element и checkedName - названий колонок из исходной таблицы. под ключом checkedName будем записывать  value в acc и проверять - есть ли уже такой элемент
      let currentRow = null;
      currentRow = acc.get(el.checkedName);
     
      // Если такого ещё нет, берём пустой объект  и задаем ему свойства колонок таблицы
      if ((!currentRow)) {
        currentRow = {};
        currentRow['Header'] = el.value;
        currentRow['columns'] = [{ 
          'Header': el.value, 
          'accessor': String(index), 
          'width': this.getColumnWidth(data, String(index), currentRow['Header'])}];
      } else {
        // если такая колонка уже есть, то спрашиваем - есть ли уже дочерние колонки. если нет - создаем подколонки, переместив в нижний уровень колонку с тем же названием

        //(currentRow['columns']) ? null : currentRow['columns'] = [];

        if (currentRow['columns'].length === 0) {

          currentRow.columns = currentRow.columns.concat([
            { 'Header': currentRow['Header'], 
              'accessor': currentRow['accessor'] },
            { 'Header': el.value, 
              'accessor': String(index), 
              'width': this.getColumnWidth(data, String(index), currentRow['Header'])}]);
          currentRow['accessor'] = null;
          // если уже есть подколонки - просто добавляем ещу одну
        } else {
          currentRow.columns = currentRow.columns.concat({ 
            'Header': el.value, 
            'accessor': String(index), 
            'width': this.getColumnWidth(data, String(index), currentRow['Header'])});
        }
      }
      // Обновляем запись с нужным ключом
      return acc.set(el.checkedName, currentRow);
    }, new Map());

    // Теперь у тебя есть map
    headerMap.forEach((value, key) => {
      outputHeader = outputHeader.concat(value);
    });
    return outputHeader;
  }

  fixRowHandler = (targetClass) => {
    console.log(document.querySelectorAll(targetClass));

    [...document.querySelectorAll(targetClass)].map((row, index) => {
      row.addEventListener('click', e => {
        console.log(row);
        let totalFixHeight = this.state.totalFixHeight;
        const rowHeight = this.state.rowHeight;
        
        if (row.classList.contains('fixed')) {
          row.classList.remove('fixed');   
        } else {
          row.classList.add('fixed'); 
        }

        let acc = this.state.headerHeight;
        totalFixHeight = [...document.querySelectorAll(targetClass + '.fixed')].reduce((acc, row) => {
          row.style.top = acc + 'px';
          return acc + rowHeight;
        }, acc);

        console.log('totalFixHeight', totalFixHeight);
        this.setState({ totalFixHeight: totalFixHeight });
        console.log(this.state);
      });
    })
  };

  componentDidMount () {
    this.fixRowHandler('.__main .rt-tr-group');
    const rowHeight = document.querySelector('.__main .rt-tr-group').offsetHeight;
    const headerHeight = document.querySelector('.__main .rt-thead.-headerGroups').offsetHeight;
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
    const tableHeader = this.tableColumnsHandler(this.props.header, [], data);    

    return (
      <Aux>
        <ReactTable 
          className ={this.props.className}
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
