import React from "react";
import calculateHandler from "./calculateHandler";
import addUnitHandler from "./addUnitHandler";
import imageHandler from "./imageHandler";
import connectorHandler from "./connectorHandler";
import deleteHandler from "./deleteHandler";
import transcriptHandler from "./transcriptHanlder";
import transcriptHeaderHandler from "./transcriptHeaderHandler";
import companiesHandler from "./companiesHandler";
import deepCopy from "../../../functions/deepCopyArray";

const headerHelpers = (fullData) => {

  // массивы заголовков и их коротких значений и очищенные данные + добавим сразу итоговые колонки и номер строки

  const header = ['№', ...fullData[0], 'Дней', 'Дней', 'Цена'];
  let headerShort = [];
  /* firebase recieve object not array if it's less data in array. that's why we check on array */
  if (Array.isArray(fullData[1])) {
    headerShort = [null, ...fullData[1], null, null, null];
  } else {
    let headerArray = [];
    Object.keys(fullData[1]).map(index => headerArray[index] = fullData[1][index]); 
    headerShort = [null, ...headerArray, null, null, null];
  }
  console.log(headerShort);
  // если сокращенного названия нет, то покажем полное название, сохраним индексы сокращенных колонок, чтобы потом раскрывать их значение
  let headerToTranscript = [];
  
  headerShort.map((elem, index) => {
    if (elem !== null) {
      headerToTranscript = headerToTranscript.concat(index);
    };
    return null;
  });


  //здесь надо подумать, как потом в другой валюте данные закидывать.
  const helpHeader = [null, ...fullData[2], 'dMin', 'dMax(connect(…))', 'add($)'];
  const transcriptedHeader = transcriptHeaderHandler(header, headerShort, headerToTranscript);
  console.log(header, headerShort, fullData[1], transcriptedHeader);
  
  // распределяем данные по helpHeader
  const helpers = {
    addons: {
      addHour: {
        unit: 'ч.',
        columns: []
      },
      addDollar: {
        unit: '$',
        columns: []
      },
      addPercent: {
        unit: '%',
        columns: []
      },
    },

    calculators: {
      priceDollar: {
        unit: '$',
        columns: []
      },
      dMin: [],
      dMaxConnectDots: {
        unit: '...',
        columns: []
      },
    },

    transcript: [],
    connectArrow: {
      unit: '→',
      columns: []
    },
    images: [],
    addedColumnsLength: []
  };

  // соберем индексы колонок с доп функциями
  helpHeader.map((helper, index) => {
    switch (helper) {
      case "add(ч.)":
        helpers.addons.addHour.columns.push(index);
        helpers.addedColumnsLength[index] = 1.5;
        break;
      case "add($)":
        helpers.addons.addDollar.columns.push(index);
        helpers.addedColumnsLength[index] = 1;
        break;
      case "add(%)":
        helpers.addons.addPercent.columns.push(index);
        helpers.addedColumnsLength[index] = 1;
        break;
      case "transcript":
        helpers.transcript.push(index);
        helpers.addedColumnsLength[index] = 0;
        break;
      case "connect(arrow)":
        helpers.connectArrow.columns.push(index);
        helpers.addedColumnsLength[index] = 1.2;
        //helpers.addedColumnsLength[index - 1] = helpers.addedColumnsLength[index - 1] + 3; /* [ index -1 ]cause this column will be deleted */
        break;
      case "dMin":
        helpers.calculators.dMin.push(index);
        helpers.addedColumnsLength[index] = 0;
        break;
      case "dMax(connect(…))":
        helpers.calculators.dMaxConnectDots.columns.push(index);
        helpers.addedColumnsLength[index] = 1; /* 1 length for dots and 1 and 1 for second number */
        //helpers.addedColumnsLength[index - 1] = helpers.addedColumnsLength[index - 1] + 3; /* [ index -1 ]cause this column will be deleted */
        break;
      case "price($)":
        helpers.calculators.priceDollar.columns.push(index);
        helpers.addons.addDollar.columns.push(index);
        helpers.addedColumnsLength[index] = 1;
        break;
      case "image":
        helpers.images.push(index);
        helpers.addedColumnsLength[index] = 0;
        break;
      default:
        helpers.addedColumnsLength[index] = 0;
    }
    return null;
  });


  // убираем из данных заголовки
  fullData.splice(0, 3);

  //отфильтровываем компании без данных и сохраняем их в отдельный массив noDataCompanies и добавляем нумерацию рядов

  const data = fullData.filter(row => row.length > 4).reduce((acc, row, index) => {
    return [...acc, [index + 1, ...row]];
  }, []);

  let noDataCompanies = fullData.filter(row => row.length <= 4).reduce((acc, row, index) => {
    return [...acc, [index + 1 + data.length, ...row]];
  }, []);
  noDataCompanies = companiesHandler(noDataCompanies);
  
  // функции для обработки helperHeader

  //подсчитаем нужные колонки с помощью функции калькулятора, отправив в нее данные и helpers. Сделаем deepcopy данных для дальнейшей обработки, оставив цифровые для фильтров, отправив calculatedData в state
  const calculatedData = calculateHandler(data, helpers.calculators);
  const calculatedDataCopy = deepCopy(calculatedData);

  //
  //console.log(header, headerShort);
/*   const headerLength = headerShort.map((elem, index) => {
    return elem ? elem.length : header[index].length;
  })
  console.log(headerLength); */
  
  const columnsWidth = calculatedDataCopy.reduce((acc, row) => {
    row.map((cell, index) => {
      
      const addedValue = helpers.addedColumnsLength[index];
      let valueLength;
/* company name tighter than other columns, cause it's latin and all - lower case */
      if (index === 1) {
        valueLength = cell.toString().length * .75 ;
      } else if (helpers.transcript.includes(index) || cell === null) {
        valueLength = 0;
      } else {
        valueLength = cell.toString().length + addedValue;
      } 
      
      //console.log('cell', cell, 'acc[i]', acc[index], 'added', addedValue,'value',  valueLength);
      
      if (!acc[index] || (acc[index] < valueLength)) {

        acc[index] = valueLength;
      }
      return null;
    });
    return acc;
  }, []);
  
  const concatedColumnsWidth = columnsWidth.reduce((acc, column, index) => {
    if (helpers.connectArrow.columns.includes(index)) {
      acc[index - 1] = acc[index-1] + column;
    } else if (helpers.calculators.dMaxConnectDots.columns.includes(index)) {/* т.к. мы делаем с расчетом на двузначные числа, то делаем минимальной ширину с учетом этого */
      if (acc[index-1] < 5) {
        acc[index - 1] = 5;
      } else {
        acc[index - 1] = acc[index - 1] + column;
      }
    } 
    
    /* check width of header  and if its longer add only 1 length, cause it is enough*/
    
    (headerShort[index] && headerShort[index].length > column)  ? acc[index] = column + 1 : acc[index] = column;
    return acc;
  }, []);
  //console.log(concatedColumnsWidth, header, headerShort);
 // console.log('columnsWidth, helpers.transcript, helpers.addedColumnsLength, calculatedData[0]', concatedColumnsWidth, helpers.transcript, helpers.addedColumnsLength, calculatedData[0]);

  // делаем ссылками сайты компаний
  const linkedCompaniesData = companiesHandler(calculatedDataCopy);
  
  //функция addUnit добавляет единицы измерения и т.п. из headerHelper
  
  const withUnitsData = addUnitHandler(linkedCompaniesData, helpers.addons);
  //функция добавления transcript

  const transcriptedData = transcriptHandler(withUnitsData, helpers.transcript);

  //функция по замене текста на картинки
  
  //const withImagesData = imageHandler(transcriptedData, helpers.images);
  //Оставляем текст вместо картинок
  const withImagesData = transcriptedData;

  //функция по объединению колонок
  const connectedArrowData = connectorHandler(withImagesData, helpers.connectArrow);
  const connectedDaysData = connectorHandler(connectedArrowData, helpers.calculators.dMaxConnectDots);

  //функция по удалению вспомогательных колонок
  const deleteColumns = [...helpers.connectArrow.columns].concat(helpers.calculators.dMaxConnectDots.columns).concat(helpers.transcript);
  const cleanedData = deleteHandler(connectedDaysData, deleteColumns);
  const cleanedColumnsWidth = concatedColumnsWidth.filter((value, index) => !deleteColumns.includes(index));
/*   console.log(concatedColumnsWidth, cleanedColumnsWidth, deleteColumns, cleanedData[0]);
 */
  //удалим колонки из header
  const headerForClean = {
    header: transcriptedHeader,
    headerShort: transcriptedHeader,
    headerToTranscript: headerToTranscript 
  };
  const cleanedHeader = deleteHandler(headerForClean, deleteColumns);
  
  const indexData = cleanedData.reduce((acc, elem, index) => {
    const currentRow = {
      index: index,
      data: elem
    };
    return [...acc, currentRow];
  }, []);

  

  const exportData = {
    numericData: calculatedData,
    tablerows: cleanedData,
    tableHeader: cleanedHeader,
    noDataCompanies: noDataCompanies,
    indexData: indexData,
    columnsWidth: cleanedColumnsWidth
  };
  return exportData;
}

export default headerHelpers;
