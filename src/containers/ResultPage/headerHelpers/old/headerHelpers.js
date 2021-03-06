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

  for (let i = 4; i < toJsonData.length; i++) {
    let rowData = {
      data: {
        currency: "$",
      },
      days: {
        title: "=Дней",
        shortName: null,
        dMax: null,
        dMin: null,
      },
      price: {
        title: "=Цена",
        shortName: null,
        totalPrice: null,
      },
    };

    toJsonData[0].map((column, index) => {
      if (!rowData.hasOwnProperty(column)) {
        // [3] - type of data, toJsonData[i][index] - value for each row
        rowData[column] = {
          header: {
            title: toJsonData[1][index],
            shortName: toJsonData[2][index],
          },
          [toJsonData[3][index]]: toJsonData[i][index],
        };
        // calculate data for summary columns put column name, index, imported row data and row obj
        rowData = calculateFunc(
          toJsonData[3][index],
          index,
          toJsonData[i],
          rowData
        );
      } else {
        // calculate data for summary columns
        rowData = calculateFunc(
          toJsonData[3][index],
          index,
          toJsonData[i],
          rowData
        );

        //if hint prop already exsist then add prop name that need to hint
        if (
          toJsonData[3][index] === "hint" &&
          rowData[column].hasOwnProperty("hint")
        ) {
          rowData[column]["hint_" + toJsonData[3][index - 1]] =
            toJsonData[i][index];
        }

        rowData[column][toJsonData[3][index]] = toJsonData[i][index];
      }
    });

    jsonData = [...jsonData, rowData];
  }

  // console.log(jsonData);

  let answeredData = jsonData.filter(
    (row) => !isNaN(row["Ответили"]["add(hours)"])
  );
  answeredData.forEach((row, index) => {
    row["index"] = index + 1;
  });

  //console.log(answwe);

  let answeredHeader = answeredData.reduce((acc, row) => {
    Object.keys(row).map((key) => {
      switch (key) {
        case "Веб-сайт":
          return [
            ...acc,
            {
              Header: row[key].header.title,
              accessor: "веб-сайт",
            },
          ];
          break;
        case "Ответили":
          return [
            ...acc,
            {
              Header: row[key].header.title,
              accessor: "ответили",
            },
          ];
          break;
        case "Офис":
          return [
            ...acc,
            {
              Header: row[key].header.title,
              accessor: "офис",
            },
          ];
          break;
        case "Перевозка по Китаю":
          return acc;
          break;
        case "Переупаковка":
          return acc;

          break;
        case "Международная перевозка":
          return acc;

          break;
        case "Таможенный платеж":
          return acc;

          break;
        case "Перевозка по России":
          return acc;

          break;
        case "Сертификат":
          return acc;

          break;
        case "Страховка":
          return acc;

          break;
        case "Комиссия":
          return acc;

          break;
        default:
          return acc;
          break;
      }
    });
  }, []);

  let resultData = [];

  // массивы заголовков и их коротких значений и очищенные данные + добавим сразу итоговые колонки и номер строки

  const header = ["№", ...fullData[0], "Дней", "Дней", "Цена"];
  let headerShort = [];
  /* firebase recieve object not array if it's less data in array. that's why we check on array */
  if (Array.isArray(fullData[1])) {
    headerShort = [null, ...fullData[1], null, null, null];
  } else {
    let headerArray = [];
    Object.keys(fullData[1]).map(
      (index) => (headerArray[index] = fullData[1][index])
    );
    headerShort = [null, ...headerArray, null, null, null];
  }
  // если сокращенного названия нет, то покажем полное название, сохраним индексы сокращенных колонок, чтобы потом раскрывать их значение
  let headerToTranscript = [];

  headerShort.map((elem, index) => {
    if (elem !== null) {
      headerToTranscript = headerToTranscript.concat(index);
    }
    return null;
  });

  //здесь надо подумать, как потом в другой валюте данные закидывать.
  const helpHeader = [
    null,
    ...fullData[2],
    "dMin",
    "dMax(connect(…))",
    "add($)",
  ];
  const transcriptedHeader = transcriptHeaderHandler(
    header,
    headerShort,
    headerToTranscript
  );

  // распределяем данные по helpHeader
  const helpers = {
    addons: {
      addHour: {
        unit: "ч.",
        columns: [],
      },
      addDollar: {
        unit: "$",
        columns: [],
      },
      addPercent: {
        unit: "%",
        columns: [],
      },
    },

    calculators: {
      priceDollar: {
        unit: "$",
        columns: [],
      },
      dMin: [],
      dMaxConnectDots: {
        unit: "...",
        columns: [],
      },
    },

    transcript: [],
    hint: [],
    connectArrow: {
      unit: "→",
      columns: [],
    },
    images: [],
    addedColumnsLength: [],
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
      case "hint":
        helpers.hint.push(index);
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
        helpers.addedColumnsLength[
          index
        ] = 1; /* 1 length for dots and 1 and 1 for second number */
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

  const data = fullData
    .filter((row) => row.length > 4)
    .reduce((acc, row, index) => {
      return [...acc, [index + 1, ...row]];
    }, []);

  let noDataCompanies = fullData
    .filter((row) => row.length <= 4)
    .reduce((acc, row, index) => {
      return [...acc, [index + 1 + data.length, ...row]];
    }, []);
  noDataCompanies = companiesHandler(noDataCompanies);

  // функции для обработки helperHeader

  //подсчитаем нужные колонки с помощью функции калькулятора, отправив в нее данные и helpers. Сделаем deepcopy данных для дальнейшей обработки, оставив цифровые для фильтров, отправив calculatedData в state
  const calculatedData = calculateHandler(data, helpers.calculators);
  const calculatedDataCopy = deepCopy(calculatedData);

  //

  const columnsWidth = calculatedDataCopy.reduce((acc, row) => {
    row.map((cell, index) => {
      const addedValue = helpers.addedColumnsLength[index];
      let valueLength;
      /* company name tighter than other columns, cause it's latin and all - lower case */
      if (index === 1) {
        valueLength = cell.toString().length * 0.75;
      } else if (helpers.transcript.includes(index) || cell === null) {
        valueLength = 0;
      } else {
        valueLength = cell.toString().length + addedValue;
      }

      //console.log('cell', cell, 'acc[i]', acc[index], 'added', addedValue,'value',  valueLength);

      if (!acc[index] || acc[index] < valueLength) {
        acc[index] = valueLength;
      }
      return null;
    });
    return acc;
  }, []);

  const concatedColumnsWidth = columnsWidth.reduce((acc, column, index) => {
    if (helpers.connectArrow.columns.includes(index)) {
      acc[index - 1] = acc[index - 1] + column;
    } else if (helpers.calculators.dMaxConnectDots.columns.includes(index)) {
      /* т.к. мы делаем с расчетом на двузначные числа, то делаем минимальной ширину с учетом этого */
      if (acc[index - 1] < 5) {
        acc[index - 1] = 5;
      } else {
        acc[index - 1] = acc[index - 1] + column;
      }
    }

    /* check width of header  and if its longer than 1 and shorter than 2, add 1 length, cause enother one it's only a dot. if its longer, no case to do something  */
    if (
      headerShort[index] &&
      headerShort[index].length - column <= 2 &&
      headerShort[index].length - column > 1
    ) {
      acc[index] = column + 1;
    } else {
      acc[index] = column;
    }
    return acc;
  }, []);
  //console.log(concatedColumnsWidth, header, headerShort);
  // console.log('columnsWidth, helpers.transcript, helpers.addedColumnsLength, calculatedData[0]', concatedColumnsWidth, helpers.transcript, helpers.addedColumnsLength, calculatedData[0]);

  // делаем ссылками сайты компаний
  const linkedCompaniesData = companiesHandler(calculatedDataCopy);

  //функция addUnit добавляет единицы измерения и т.п. из headerHelper

  const withUnitsData = addUnitHandler(linkedCompaniesData, helpers.addons);
  //функция добавления transcript

  const transcriptedData = transcriptHandler(
    withUnitsData,
    helpers.transcript,
    helpers.hint
  );

  //функция по замене текста на картинки

  //const withImagesData = imageHandler(transcriptedData, helpers.images);
  //Оставляем текст вместо картинок
  const withImagesData = transcriptedData;

  //функция по объединению колонок
  const connectedArrowData = connectorHandler(
    withImagesData,
    helpers.connectArrow
  );
  const connectedDaysData = connectorHandler(
    connectedArrowData,
    helpers.calculators.dMaxConnectDots
  );

  //функция по удалению вспомогательных колонок
  const deleteColumns = [...helpers.connectArrow.columns]
    .concat(helpers.calculators.dMaxConnectDots.columns)
    .concat(helpers.transcript)
    .concat(helpers.hint);
  const cleanedData = deleteHandler(connectedDaysData, deleteColumns);
  const cleanedColumnsWidth = concatedColumnsWidth.filter(
    (value, index) => !deleteColumns.includes(index)
  );
  /*   console.log(concatedColumnsWidth, cleanedColumnsWidth, deleteColumns, cleanedData[0]);
   */
  //удалим колонки из header
  const headerForClean = {
    header: transcriptedHeader,
    headerShort: transcriptedHeader,
    headerToTranscript: headerToTranscript,
  };
  const cleanedHeader = deleteHandler(headerForClean, deleteColumns);

  const indexData = cleanedData.reduce((acc, elem, index) => {
    const currentRow = {
      index: index,
      data: elem,
    };
    return [...acc, currentRow];
  }, []);

  // const exportData = {
  //   numericData: calculatedData,
  //   tablerows: cleanedData,
  //   tableHeader: cleanedHeader,
  //   noDataCompanies: noDataCompanies,
  //   indexData: indexData,
  //   columnsWidth: cleanedColumnsWidth,
  //   jsonData: answeredData
  // };

  // return exportData;

  return answeredData;
};

export default headerHelpers;
