//import React from "react";
import calculateHandler from "./calculateHandler";
import addUnitHandler from "./addUnitHandler";
import imageHandler from "./imageHandler";
import connectorHandler from "./connectorHandler";
import deleteHandler from "./deleteHandler";
import transcriptHandler from "./transcriptHanlder";
import transcriptHeaderHandler from "./transcriptHeaderHandler";

const headerHelpers = (fullData) => {

  // массивы заголовков и их коротких значений и очищенные данные + добавим сразу итоговые колонки

  const header = [...fullData[0], '= дней', '= дней', '= цена'];
  const headerShort = [...fullData[1], null, null, null];

  // если сокращенного названия нет, то покажем полное название, сохраним индексы сокращенных колонок, чтобы потом раскрывать их значение
  let headerToTranscript = [];
  headerShort.map((elem, index) => {
    if (elem === null) {
  
    } else {
      headerToTranscript = headerToTranscript.concat(index);
    };
    return null;
  });


  //здесь надо подумать, как потом в другой валюте данные закидывать.
  const helpHeader = [...fullData[2], 'dMin', 'dMax(connect(…))', 'add($)'];
  const transcriptedHeader = transcriptHeaderHandler(header, headerShort, headerToTranscript);

  // распределяем данные по helpHeader
  const helpers = {
    addons: {
      addHour: {
        unit: ' ч.',
        columns: []
      },
      addDollar: {
        unit: ' $',
        columns: []
      },
      addPercent: {
        unit: ' %',
        columns: []
      },
    },

    calculators: {
      priceDollar: {
        unit: ' $',
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
      unit: ' →  ',
      columns: []
    },
    images: []
  };

  // соберем индексы колонок с доп функциями
  helpHeader.map((helper, index) => {
    switch (helper) {
      case "add(ч.)":
        helpers.addons.addHour.columns = helpers.addons.addHour.columns.concat(index);
        break;
      case "add($)":
        helpers.addons.addDollar.columns = helpers.addons.addDollar.columns.concat(index);
        break;
      case "add(%)":
        helpers.addons.addPercent.columns = helpers.addons.addPercent.columns.concat(index);
        break;
      case "transcript":
        helpers.transcript = helpers.transcript.concat(index);
        break;
      case "connect(arrow)":
        helpers.connectArrow.columns = helpers.connectArrow.columns.concat(index);
        break;
      case "dMin":
        helpers.calculators.dMin = helpers.calculators.dMin.concat(index);
        break;
      case "dMax(connect(…))":
        helpers.calculators.dMaxConnectDots.columns = helpers.calculators.dMaxConnectDots.columns.concat(index);
        break;
      case "price($)":
        helpers.calculators.priceDollar.columns = helpers.calculators.priceDollar.columns.concat(index);
        helpers.addons.addDollar.columns = helpers.addons.addDollar.columns.concat(index);
        break;
      case "image":
        helpers.images = helpers.images.concat(index);
        break;
      default:
    }
    return null;
  });

  //отфильтровываем компании без данных и сохраняем их в отдельный массив noDataCompanies
  
  const noDataCompanies = fullData.filter(row => row.length <= 3);
  //console.log(noDataCompanies);
  const data = fullData.filter(row => row.length > 3);

  // убираем из данных заголовки
  data.splice(0, 3);

  // функции для обработки helperHeader
  console.log(data);
  //подсчитаем нужные колонки с помощью функции калькулятора, отправив в нее данные и helpers
  const calculatedData = calculateHandler(data, helpers.calculators);


  //функция addUnit добавляет единицы измерения и т.п. из headerHelper
  
  const withUnitsData = addUnitHandler(calculatedData, helpers.addons);
  console.log('calculatedData', calculatedData, 'withUnitsData', withUnitsData);
  //функция добавления transcript

  const transcriptedData = transcriptHandler(withUnitsData, helpers.transcript);

  //функция по замене текста на картинки
  const withImagesData = imageHandler(transcriptedData, helpers.images);

  //функция по объединению колонок
  const connectedArrowData = connectorHandler(withImagesData, helpers.connectArrow);
  const connectedDaysData = connectorHandler(connectedArrowData, helpers.calculators.dMaxConnectDots);



  //функция по удалению вспомогательных колонок
  const deleteColumns = [...helpers.connectArrow.columns].concat(helpers.calculators.dMaxConnectDots.columns).concat(helpers.transcript);
  const cleanedData = deleteHandler(connectedDaysData, deleteColumns);

  //удалим колонки из header
  const headerForClean = {
    header: transcriptedHeader,
    headerShort: transcriptedHeader,
    headerToTranscript: headerToTranscript 
  };
  const cleanedHeader = deleteHandler(headerForClean, deleteColumns);

  const exportData = {
    numericData: calculatedData,
    tablerows: cleanedData,
    tableHeader: cleanedHeader,
    noDataCompanies: noDataCompanies
  };
  
  return exportData;
}

export default headerHelpers;
