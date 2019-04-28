import React, { Component } from 'react';
import ReactTable from "react-table";
//  import axios from "axios";
import './Table.pcss';
import Aux from "../../hoc/Aux";
//import headerHelpers from "../../containers/headerHelpers/headerHelpers";

class Table extends Component {

  //создаем колонки с их заголовками и уровнями для react-table
  tableColumnsHandler = (inputHeader, outputHeader) => {
    console.log('inputHeader', inputHeader, 'outputHeader', outputHeader);
    let headerMap = inputHeader.reduce((acc, el, index) => {
      // Пробуем взять элемент с нужным ключом
      
      let currentRow = null;
      currentRow = acc.get(el);
      if (typeof(el) === 'string') {
        currentRow = acc.get(el);
      } else if (typeof (el) === 'object') {
        //console.log('get test', acc.get(el));
        currentRow = acc.get(el);
      }


      
      // Если такого ещё нет, берём пустой объект  и задаем ему свойства колонок таблицы
      if ((!currentRow)) {
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

    console.log('outputHeader', outputHeader);

    return outputHeader;
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
