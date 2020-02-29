import React from "react";
import generateColumns from "./generateColumns";
import generateData from "./generateData";
// import calculateHandler from "./calculateHandler";
// import addUnitHandler from "./addUnitHandler";
// import imageHandler from "./imageHandler";
// import connectorHandler from "./connectorHandler";
// import deleteHandler from "./deleteHandler";
// import transcriptHandler from "./transcriptHandler";
// import transcriptHeaderHandler from "./transcriptHeaderHandler";
// import companiesHandler from "./companiesHandler";
// import deepCopy from "../../../functions/deepCopyArray";
import { Object } from "core-js";
import calculateFunc from "./calculateFunc";

const headerHelpers = (fullData) => {


  let toJsonData = [...fullData];
 // console.log('full data' , jsonData);
  let jsonData = [];

  let data = null;
  let header = toJsonData.slice(0, 4);
  //let columns = {};

  // let columnHeader = (
  //   <div>
  //     <span className='transcriptWrapper'>{toJsonData[3][index]}<span className={transcriptedClass}>{elem}</span></span>
  //   </div>
  // )

  const columns = generateColumns(header);
  let columnsArray = [];
  Object.values(columns).map(value => columnsArray.push(value));

  for (let i = 4; i < toJsonData.length; i++) {
    let rowData = {
      days: {
        title: '=Дней',
        shortName: null,
        dMax: null,
        dMin: null,
      },
      price: {
        title: '=Цена',
        shortName: null,
        totalPrice: null,
      }
    };

    toJsonData[0].map((column, index) => {
      if (!rowData.hasOwnProperty(column)) {

        // [3] - type of data, toJsonData[i][index] - value for each row
        rowData[column] = {
          // header: {
          //   title: toJsonData[1][index],
          //   shortName: toJsonData[2][index],
          // },
          [toJsonData[3][index]]: toJsonData[i][index],
        };
        // calculate data for summary columns put column name, index, imported row data and row obj
        rowData = calculateFunc(toJsonData[3][index], index, toJsonData[i], rowData);

      } else {
        // calculate data for summary columns
        rowData = calculateFunc(toJsonData[3][index], index, toJsonData[i], rowData);

        //if hint prop already exsist then add prop name that need to hint
        if (toJsonData[3][index] === 'hint' && rowData[column].hasOwnProperty('hint') ) {
          rowData[column]['hint_' + toJsonData[3][index-1]] = toJsonData[i][index];
        }

        rowData[column][toJsonData[3][index]] = toJsonData[i][index];
      }
    });

    jsonData = [...jsonData, rowData];
  }





  // let accessorArray = Object.values(columns).reduce((acc, topColumn) => {

  //   topColumn.columns.map(column => acc = [...acc, column.accessor]);
  //   return acc;
  // }, []);

  let answeredData = jsonData.filter(row =>
    !isNaN(row['Ответили']['add(hours)'])
    );
  answeredData.forEach((row, index) => {
      row['index'] = index +1;
      row['dataType'] = header[3][index]
    });

  let combinedData = [];

  console.log(answeredData);


  // answeredData.forEach((row, rowIndex) => {
  //   Object.keys(row).map(column => {
  //     switch (column) {
  //       case 'Веб-сайт':
  //         const tag = <span>{row[column].value}</span>;
  //         answeredData[rowIndex][column] = tag;
  //         break;
  //       case 'Ответили':
  //         return (<span>{row[column]['add(hours)']}</span>)
  //         break;
  //       case 'Офис':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'Перевозка по Китаю':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'Переупаковка':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'Международная перевозка':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'Таможенный платеж':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'Перевозка по России':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'Сертификат':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'Страховка':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'Комиссия':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'days':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       case 'price':
  //         //return (<span>{column.value}</span>);
  //         break;
  //       default:
  //         break;
  //     }
  //   })
  // });

  const superData = generateData(answeredData, columnsArray);

  return {
    columns: columnsArray,
    data: superData
  };
}

export default headerHelpers;
