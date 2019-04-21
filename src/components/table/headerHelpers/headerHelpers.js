import calculateHandler from "./calculateHandler";
import addUnitHandler from "./addUnitHandler";
import imageHandler from "./imageHandler";

const headerHelpers = (fullData) => {

  // массивы заголовков и их коротких значений и очищенные данные + добавим сразу итоговые колонки

  const header = [...fullData[0], '= дней', '= дней', '= цена'];
  const headerShort = [...fullData[1], '= дней', '= дней', '= цена'];

  // если сокращенного названия нет, то покажем полное название, сохраним индексы сокращенных колонок, чтобы потом раскрывать их значение
  let headerToTranscript = [];
  headerShort.map((elem, index) => {
    if (elem === null) {
      headerShort[index] = header[index];
    } else {
      headerToTranscript = headerToTranscript.concat(index);
    };
  });

  //здесь надо подумать, как потом в другой валюте данные закидывать.
  const helpHeader = [...fullData[2], 'dMin', 'dMax(concat(…))', 'add($)'];

  //console.log('headerShortIndex', headerToTranscript);

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
      dMaxConnectDots: [],
    },

    transcript: [],
    connectArrow: [],
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
      case "concat(arrow)":
        helpers.connectArrow = helpers.connectArrow.concat(index);
        break;
      case "dMin":
        helpers.calculators.dMin = helpers.calculators.dMin.concat(index);
        break;
      case "dMax(connect(…))":
        helpers.calculators.dMaxConnectDots = helpers.calculators.dMaxConnectDots.concat(index);
        break;
      case "price($)":
        helpers.calculators.priceDollar.columns = helpers.calculators.priceDollar.columns.concat(index);
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
  console.log(noDataCompanies);
  const data = fullData.filter(row => row.length > 3);

  // убираем из данных заголовки
  data.splice(0, 3);


  // функции для обработки helperHeader

  //подсчитаем нужные колонки с помощью функции калькулятора, отправив в нее данные и helpers

  const calculatedData = calculateHandler(data, helpers.calculators);

  const dataConnecter = (dataRow, targetColumns) => {
    let connectedRow = [];
    //вернем собранный ряд, если обычная колонка - вернем элемент, если из целевой выборки - присоединим значение к предыдущему элементу
    return dataRow.reduce((acc, element, index) => {
      //по умолчанию - копируем элемент
      let currentElem = element;
      targetColumns.map(targetIndex => {
        if (targetIndex === index) {
          const prevElement = acc[acc.length - 1];
          //если предыдущий элемент - не число, то ему не нужна единица измерения
          if (!isNaN(prevElement)) {
            acc[acc.length - 1] = (prevElement + dataRow[index]);
          } else {
            currentElem = false;
          }
          //   Так как не будем прибавлять к ряду этот элемент вернем false
          currentElem = false;
        }
        return null;
      });

      if (currentElem === false) {
        return acc;
      } else {
        return [...acc, currentElem];
      }
    }, connectedRow);

  };

  //функция addUnit добавляет единицы измерения и т.п. из headerHelper
  const withUnitsData = addUnitHandler(calculatedData, helpers.addons);

  //функция по замене текста на картинки
  const withImages = imageHandler(withUnitsData, helpers.images);
  console.log('withImages ', withImages);
   
  //console.log('connectedData', connectedData, 'countedData', countedData);

  const exportData = {
    numericData: calculatedData,
    tablerows: withUnitsData,

    tableHeader: {
      header: header,
      headerShort: headerShort,
      headerToTranscript: headerToTranscript 
    }
  };

  return exportData;
}

export default headerHelpers;
