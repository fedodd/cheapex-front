import React, { Component } from 'react';
import {
  useTable,
} from "react-table";
import classes from './Table.pcss';
import Aux from "../../hoc/Aux";
import Spinner from "../spinner/Spinner";
import deepCopy from "../../functions/deepCopyArray";

class Table extends Component {
  constructor(props) {
    super(props);
    this.tableContainerRef = React.createRef();
    this.tableRef = React.createRef();
  }

  state = {
    fixrowsCounter: 0,
    headerHeight: 54, /* row height + 15px padding make it 1 px less to fix gap between fixed rows */
    rowHeight: 44,
    totalFixHeight: 0,
    fixedrows: [],
    loading: this.props.loading,
    companyWidth: 'auto',
    columnsWidth: this.props.columnsWidth,
    magicSpacing: 11
  }

  calculateColumnsWidth = () => {
    //console.log(this.state.columnsWidth, this.tableRef.current.props.columns );
    let newColumnsWidth = this.state.columnsWidth.map(elem => Math.round(elem * this.state.magicSpacing) + 10);/*  10 - padding */
    newColumnsWidth[1] += 20;
    newColumnsWidth[newColumnsWidth.length - 1] += this.state.magicSpacing;
    newColumnsWidth[newColumnsWidth.length - 2] += (20 + this.state.magicSpacing);
    this.setState({
      columnsWidth: newColumnsWidth
    })
  }

/*   getColumnWidth = (rows, accessor) => {
    const magicSpacing = 11;
    return Math.round(this.props.columnsWidth[accessor] * magicSpacing);
  }
 */
  //создаем колонки с их заголовками и уровнями для react-table
  tableColumnsHandler = (inputHeader, outputHeader, data) => {
    let headerMap = inputHeader.header.reduce((acc, el, index) => {
      // Пробуем взять элемент с нужным ключом. Элементы - объекты с value - react element и checkedName - названий колонок из исходной таблицы. под ключом checkedName будем записывать  value в acc и проверять - есть ли уже такой элемент
      let currentRow = null;

      currentRow = acc.get(el.checkedName);
      // Если такого ещё нет, берём пустой объект  и задаем ему свойства колонок таблицы
     // console.log(this.state.columnsWidth[index], el.value.props.children[0]);
      if ((!currentRow)) {
        currentRow = {};
        currentRow['Header'] = el.value;
        currentRow['columns'] = [{
          'Header': el.value,
          'accessor': String(index),
          'minWidth': 50,
          'maxWidth': 200,
          'className': 'parentColumn',
          'headerClassName': '',
          'width': this.state.columnsWidth[String(index)]
        }];
      } else {

        // если такая колонка уже есть, то спрашиваем - есть ли уже дочерние колонки. если нет - создаем подколонки, переместив в нижний уровень колонку с тем же названием

        //(currentRow['columns']) ? null : currentRow['columns'] = [];
        currentRow.columns = currentRow.columns.concat({
          'Header': el.value,
          'accessor': String(index),
          'minWidth': 50,
          'maxWidth': 200,
          'width': this.state.columnsWidth[String(index)],
          'className': 'childrenColumn'
        });

  /*       if (currentRow.columns.length === 1) {

          console.log(currentRow);

          currentRow.columns = currentRow.columns.concat([
            {
              'Header': el.value,
              'accessor': String(index),
              'minWidth': 50,
              'maxWidth': 200,
              'className': 'superClass',
              'width': this.state.columnsWidth[String(index)]
            }]);
          currentRow['accessor'] = null;
          console.log(currentRow.columns);
          // если уже есть подколонки - просто добавляем ещу одну
        } else {
        //  console.log(currentRow);
          currentRow.columns = currentRow.columns.concat({
            'Header': el.value,
            'accessor': String(index),
            'minWidth': 50,
            'maxWidth': 200,
            'width': this.state.columnsWidth[String(index)]
          });
        } */
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

/*   static getDerivedStateFromProps(props, state) {

  } */

  componentDidMount() {
    this.calculateColumnsWidth();
    this.setState({
      totalFixHeight: this.state.headerHeight,
      loading: true
    });
  }

  // запускаем спиннер с задежкой
  delayHandler = () => {
    window.setTimeout(() => { this.setState({ loading: false }) }, 300);
    return <Spinner />;
  }

  componentDidUpdate(prevProps) {
    // запускаем спиннер с задежкой если изменидись данные в таблице

    if (this.props.data !== prevProps.data && this.props.data.length) {
      this.setState({
        loading: true
      });
    }
  }

  render() {

    let data = (this.props.data.length === 0) ? [[]] : deepCopy(this.props.data);

    //пересчет номеров строк
    data.map((row, index) => row[0] = <span uniqkey={row[0]} className="rowIndex">{index + 1}</span>);

    // проверяем - если данные еще не загрузились -выводим пустую строку
    //создаем колонки с их заголовками и уровнями для react-table
    const tableHeader = this.tableColumnsHandler(this.props.header, [], data);

    tableHeader.map((header, index) => {
      if (header.columns.length > 1) {
        header.headerClassName = 'firstChildrenColumn';
        const prevColumn = tableHeader[index - 1].columns[tableHeader[index - 1].columns.length - 1];
        if (prevColumn.className === 'lastChildrenColumn') {
          prevColumn.className = '';
          prevColumn.width = prevColumn.width - 20;
        };
        const lastGroupColumn = header.columns[header.columns.length - 1]
        const firstGroupColumn = header.columns[0];
        firstGroupColumn.className = 'firstChildrenColumn';
        firstGroupColumn.width = firstGroupColumn.width + 20;
        lastGroupColumn.className = 'lastChildrenColumn';
        lastGroupColumn.width = lastGroupColumn.width + 20;
      }
    });
    const companiesWidth = tableHeader[1].columns[0].width;
    const columnsWidth = this.state.columnsWidth;
    return (
      <Aux>
        <div className={classes.tableContainer} id="tableContainer" ref={this.tableContainerRef}>
          <style>{`
            :root {
              --tableWidth: ${this.tableContainerRef.current ? this.tableContainerRef.current.offsetWidth: 0}px;
              --companiesWidth: ${companiesWidth ? companiesWidth + 'px' : 'auto'};
              --firstColumnWidth: ${columnsWidth[0]}px;
              --lastColumnWidth: ${columnsWidth[columnsWidth.length - 1]}px;
              --magicSpacing: ${this.state.magicSpacing}px;
              }
            `}
          </style>
          {this.state.loading ? this.delayHandler() : null}
          <ReactTable
            ref={this.tableRef}
            className={this.props.className}
            data={data}
            columns={tableHeader}
            showPaginationBottom={false}
            defaultPageSize={1}
            pageSize={data.length}
            getTrGroupProps={(_state, rowInfo) => {
              const id = rowInfo.row[0].props.uniqkey;
              const isFixed = this.props.fixedRows && this.props.fixedRows.includes(id);
              //console.log(this.props.fixedRows);

              return {
                onClick: (e) => this.props.addFixedRowHandler(id),
                className: isFixed ? "fixed" : "",
                style: {
                  top: isFixed ? this.state.headerHeight + this.props.fixedRows.indexOf(id) * this.state.rowHeight + "px" : "auto"
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
