import React from "react";
import calculateHandler from "./calculateHandler";
import addUnitHandler from "./addUnitHandler";
import imageHandler from "./imageHandler";
import connectorHandler from "./connectorHandler";
import deleteHandler from "./deleteHandler";
import transcriptHandler from "./transcriptHandler";
import transcriptHeaderHandler from "./transcriptHeaderHandler";
import companiesHandler from "./companiesHandler";
import deepCopy from "../../../functions/deepCopyArray";
import { Object } from "core-js";
import calculateFunc from "./calculateFunc";

const headerHelpers = (fullData) => {


  let toJsonData = [...fullData];
 // console.log('full data' , jsonData);
  let jsonData = [];

  let data = null;
  let header = toJsonData.slice(0, 4);
  let columns = {};

  // let columnHeader = (
  //   <div>
  //     <span className='transcriptWrapper'>{toJsonData[3][index]}<span className={transcriptedClass}>{elem}</span></span>
  //   </div>
  // )

  //copy accessors and index of column to work with data
  let columnIndexes = [];

  toJsonData[0].map((columnName, index) => {
    let columnType = toJsonData[3][index];

    let accessorName = columnName + '_' + columnType;
    //copy accessors and index of column to work with data
    columnIndexes[index] = accessorName;

    if (!columns.hasOwnProperty(columnName)) {
      let header = null;
      toJsonData[2][index] === null ?
        header = <span className='transcriptWrapper'>{columnName}</span>
        : header = <span className='transcriptWrapper'>{toJsonData[2][index]}<span className='with_transcripted'>{columnName}</span></span>

      columns[columnName] =  {
        Header: header,
        id: columnName,
        columns: [{
          Header: columnName + '_',
          id: columnName + '_',
          accessor: accessorName,
        }]
      };

    } else {
      if (['dMin', 'price($)', 'image'].find(elem => elem === columnType)) {
        columns[columnName].columns.push({
            Header: columnType,
            id: accessorName,
            accessor: accessorName,
          })
      }
     // console.log(findedHeader);

    }

    return null;

  });

  columns = {
    ...columns,
    'Дней': {
      Header: 'Дней',
      id: 'Дней_',
      columns: [
        {Header: '=дней_',
        accessor: 'totalDays'},
      ]
    },
    'Цена': {
      Header: 'Цена',
      id: 'Цена_',
      columns: [
        {Header: '=цена_',
        accessor: 'totalPrice'},
      ]
    }
  }

  console.log(columns);


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

    let newData = {}

    columnIndexes.map((columnIndex, index) => {
      //console.log('column indexes', columnIndex, index);

    })

    toJsonData[0].map((column, index) => {
      if (!rowData.hasOwnProperty(column)) {

        // [3] - type of data, toJsonData[i][index] - value for each row
        rowData[column] = {
          header: {
            title: toJsonData[1][index],
            shortName: toJsonData[2][index],
          },
          columnIndex: index,
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

  let accessorArray = Object.values(columns).reduce((acc, topColumn) => {

    topColumn.columns.map(column => acc = [...acc, column.accessor]);
    return acc;
  }, []);

  console.log(accessorArray);




  let answeredData = jsonData.filter(row =>
    !isNaN(row['Ответили']['add(hours)'])
    );
  answeredData.forEach((row, index) => {
      row['index'] = index +1;
    });

  //console.log(answwe);




  return {
    columns,
    data: jsonData
  };
}

export default headerHelpers;
