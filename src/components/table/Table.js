import React, { Component } from 'react';
import ReactTable from "react-table";
import axios from "axios";
import './Table.pcss';
import Aux from "../../hoc/Aux";

class Table extends Component {

  state = {
    companies: [],
    tablerows: [],
    tableHeader: [],
    tableHeaderShort: [],
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
    axios.get('https://react-app-bc4e6.firebaseio.com/importedSheet/-LcRs-paw_C6Cl0Z-e8v.json').then(response => {
      const fullData = response.data.data;
      //console.log('response.data ', response.data);
      //console.log('fullData ', fullData);
    
    // массивы заголовков и их коротких значений и очищенные данные
      const header = fullData[0];
      const headerShort = fullData[1];
      const helpHeader = fullData[2];


      // распределяем данные по helpHeader
      const helpersIndexObj = {
        connect: [],
        transcript: [],
        connectArrow: [],
        dMin: [],
        dMaxConnectDots: [],
        price: [],
        image: []
      };

      helpHeader.map((helper, index) => {
        switch (helper) {
          case "concat":
            helpersIndexObj.connect = helpersIndexObj.connect.concat(index);
            break;
          case "transcript":
            helpersIndexObj.transcript = helpersIndexObj.transcript.concat(index);
            break;
          case "concat(arrow)":
            helpersIndexObj.connectArrow = helpersIndexObj.connectArrow.concat(index);
            break;
          case "dMin":
            helpersIndexObj.dMin = helpersIndexObj.dMin.concat(index);
            break;
          case "dMax(concat(…))":
            helpersIndexObj.dMaxConnectDots = helpersIndexObj.dMaxConnectDots.concat(index);
            break;
          case "price":
            helpersIndexObj.price = helpersIndexObj.price.concat(index);
            break;
          case "image":
            helpersIndexObj.image = helpersIndexObj.image.concat(index);
            break;
          default:
        }
        return null;
      });
      
      //console.log(helpersIndexObj);

      const data = fullData;
        // убираем из данных заголовки
      data.splice(0, 3);

      //собираем колонки которые будем считать
      const priceColumns = helpersIndexObj.price;
      const dMinColumns = helpersIndexObj.dMin;
      const dMaxColumns = helpersIndexObj.dMaxConnectDots;

      // функция -кальукулятор значений ряда
      const dataCounter = (dataRow, targetArray) => {
        return targetArray.reduce(((acc, columnIndex) => {
          if (isNaN(dataRow[columnIndex])) {
            return acc;
          } else {
            return acc + dataRow[columnIndex];
          };
        }), 0);
      }
;
      
      const countedData = data.reduce((acc, row) => {

        const rowDMin = dataCounter(row, dMinColumns);
        const rowDMax = dataCounter(row, dMaxColumns);
        const rowFullPrice = dataCounter(row, priceColumns);
        //считаем полную стоимость
/*         const rowFullPrice = priceColumns.reduce(((acc, indexOfPrice) => {
          if (isNaN(row[indexOfPrice])) {
            return acc;
          } else {
            return acc+row[indexOfPrice];
          };
        }), 0); */

        return [...acc, [...row, rowDMin, rowDMax, rowFullPrice]];
      }, []);
      console.log(countedData);


      this.setState({
          tablerows: data,
          tableHeaderShort: headerShort,
          tableHeader: header
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

  //соединяем единицы измерения. в state у нас будут исходные распарсенные данные, чтобы фильтровать по числам, но отображать будем с единицами измерения и т.п.

  columnSpliceHandler = () => {
    const data = this.state.tablerows;

    if (data.length === 0) {
      return (
        <div>there is no data.</div>
      )
    };
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
    const headerFromData = this.state.tableHeader;
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
