import React, { Component } from 'react';
import ReactTable from "react-table";

import classes from './Table.pcss';
import Aux from "../../hoc/Aux";
import Spinner from "../spinner/Spinner";
import deepCopy from "../../functions/deepCopyArray";

const headerHeight = 48;
const rowHeight = 28;

class Table extends Component {


  state = {
    fixrowsCounter: 0,
    headerHeight: 0,
    rowHeight: 0,
    totalFixHeight: 0,
    fixedrows: [],
    loading: this.props.loading,
    companyWidth: 'auto',
    
  }

  getColumnWidth = (rows, accessor, headerText) => {
    const maxWidth = 200;
    const magicSpacing = 11;
    let maxLength = 0;
    const checkingRow = rows[0];
    const checkingCell = rows[0][accessor];
    // последние колонки ставим заданной ширины
    if (checkingCell === checkingRow[checkingRow.length - 1] || checkingCell === checkingRow[checkingRow.length - 2]) {
     
      maxLength = 10;
    } else if (checkingCell === checkingRow[0]) {
      maxLength = 4;
    } else if (typeof (checkingCell) === 'object') {
      if (checkingCell.props.children) {
        const className = checkingCell.props.className;
        switch (className) {
          case "dotsConnected":
            maxLength = 8;
            break;
          case "arrowConnected":
            maxLength = 10;
            break;
          case "transcriptWrapper":
            maxLength = 6;
            break;
          case "company":
            [...rows].map(row => {
              maxLength = (row[accessor].props.children.length > maxLength) ? maxLength = row[accessor].props.children.length : maxLength;
              return null;
            });
            maxLength < 11 ? maxLength = 11 : null;
            break;
          default:
            //console.log('default class not in list ', checkingCell);
            maxLength = 7;
        }
      } else {
        //console.log('else object without children', checkingCell);
        maxLength = 7;
      }
    } else {
      //console.log('else not object', checkingCell);
      [...rows].map(row => {
        //console.log(maxLength);
        maxLength = (`${row[accessor]}`.length > maxLength) ? maxLength = `${row[accessor]}`.length + 2 : maxLength;
        return null;
      });
    }

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
          'minWidth': 50,
          'width': this.getColumnWidth(data, String(index), currentRow['Header'])
        }];
      } else {
        // если такая колонка уже есть, то спрашиваем - есть ли уже дочерние колонки. если нет - создаем подколонки, переместив в нижний уровень колонку с тем же названием

        //(currentRow['columns']) ? null : currentRow['columns'] = [];

        if (currentRow['columns'].length === 0) {

          currentRow.columns = currentRow.columns.concat([
            {
              'Header': currentRow['Header'],
              'accessor': currentRow['accessor'],
              'headerClassName': 'superClass'
            },
            {
              'Header': el.value,
              'accessor': String(index),
              'minWidth': 50,
              'width': this.getColumnWidth(data, String(index), currentRow['Header']),
              'headerClassName': 'superClass'
            }]);
          currentRow['accessor'] = null;
          // если уже есть подколонки - просто добавляем ещу одну
        } else {
          currentRow.columns = currentRow.columns.concat({
            'Header': el.value,
            'accessor': String(index),
            'minWidth': 50,
            'width': this.getColumnWidth(data, String(index), currentRow['Header']),
              'headerClassName': 'superClass'
          });
        }
      }
      // Обновляем запись с нужным ключом
      return acc.set(el.checkedName, currentRow);
    }, new Map());

    //  map
    headerMap.forEach((value, key) => {
      outputHeader = outputHeader.concat(value);
    });
    return outputHeader;

  }

  //навешиваем listener on click записываем позицию ряда и перерсчитываем каждый раз при клике. 
  // fixRowHandler = (targetClass) => {
  //   [...document.querySelectorAll(targetClass)].map((row, index) => {
  //     const fixedRows = this.props.fixedRows;

  //     const rowIndex = row.querySelector('[uniqkey]').getAttribute('uniqkey');
  //     fixedRows.includes(rowIndex) ? row.classList.add('fixed') : null;

  //     row.addEventListener('click', e => {

  //       this.props.addFixedRowHandler(rowIndex);
  //       let totalFixHeight = this.state.totalFixHeight;
  //       const rowHeight = this.state.rowHeight;

  //       if (row.classList.contains('fixed')) {
  //         row.classList.remove('fixed');
  //       } else {
  //         row.classList.add('fixed');
  //       }

  //       let acc = this.state.headerHeight;
  //       totalFixHeight = [...document.querySelectorAll(targetClass + '.fixed')].reduce((acc, row) => {
  //         row.style.top = acc + 'px';
  //         return acc + rowHeight;
  //       }, acc);

  //       this.setState({ totalFixHeight: totalFixHeight });
  //     });
  //     return null;
  //   })
  // };

  componentDidMount() {
    // this.fixRowHandler('.__main .rt-tr-group');
    const rowHeight = document.querySelector('.__main .rt-tr-group').offsetHeight;
    const headerHeight = document.querySelector('.__main .rt-thead.-headerGroups').offsetHeight;

    this.setState({
      headerHeight: headerHeight,
      rowHeight: rowHeight,
      totalFixHeight: headerHeight,
      loading: true
    });
  }

  // запускаем спиннер с задежкой 
  delayHandler = () => {
    window.setTimeout(() => { this.setState({ loading: false }) }, 200);
    return <Spinner />;
  }

  componentDidUpdate(prevProps) {
    // запускаем спиннер с задежкой если изменидись данные в таблице
    
    if (this.props.data !== prevProps.data && this.props.data.length) {
      // this.fixRowHandler('.__main .rt-tr-group');
            
      const rowHeight = document.querySelector('.__main .rt-tr-group').offsetHeight;
      const headerHeight = document.querySelector('.__main .rt-thead.-headerGroups').offsetHeight;

      this.setState({
        headerHeight: headerHeight,
        rowHeight: rowHeight,
        totalFixHeight: headerHeight,
        loading: true
      });
    }
  }

  render() {
    console.log('render');
    let tableWidth = 0;
    if (document.getElementById('tableContainer')) {
      tableWidth = document.getElementById('tableContainer').offsetWidth;
    }
    let data = (this.props.data.length === 0) ? [[]] : deepCopy(this.props.data);

    //пересчет номеров строк
    data.map((row, index) => row[0] = <span uniqkey={row[0]} className="rowIndex">{index + 1}</span>);

    // проверяем - если данные еще не загрузились -выводим пустую строку
    //создаем колонки с их заголовками и уровнями для react-table
    const tableHeader = this.tableColumnsHandler(this.props.header, [], data);

    return (
      <Aux>
        <div className={classes.tableContainer} id="tableContainer">
          <style>{`
            :root {
              --tableWidth: ${tableWidth}px;
              }
            `}
          </style>
          {this.state.loading ? this.delayHandler() : null}
          <ReactTable
            className={this.props.className}
            data={data}
            columns={tableHeader}
            showPaginationBottom={false}
            defaultPageSize={1}
            pageSize={data.length}
            getTrGroupProps={(_state, rowInfo) => {
              const id = rowInfo.row[0].props.uniqkey;
              const isFixed = this.props.fixedRows && this.props.fixedRows.includes(id);
              console.log(this.props.fixedrows);
              
              return {
                onClick: (e) => this.props.addFixedRowHandler(id),
                className: isFixed ? "fixed" : "",
                style: {
                  top: isFixed ? headerHeight + this.props.fixedRows.indexOf(id) * rowHeight + "px" : "auto"
                }
              }
            }}
          />
        </div>
      </Aux>
    );
  }
};

export default Table; 