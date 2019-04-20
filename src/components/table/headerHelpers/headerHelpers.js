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
  const helpHeader = [...fullData[2], 'dMin', 'dMax(concat(…))', 'connect($)'];

  //console.log('headerShortIndex', headerToTranscript);

  // распределяем данные по helpHeader
  const helpersIndexObj = {
    connectors: {
      connectHour: {
        connector: ' ч.',
        columns: []
      },
      connectDollar: {
        connector: ' $',
        columns: []
      },
      connectPercent: {
        connector: ' %',
        columns: []
      },
   },

    transcript: [],
    connectArrow: [],
    dMin: [],
    dMaxConnectDots: [],
    priceDollar: {
      connector: ' $',
      columns: []
    },
    image: [],
    total: []
  };

  // соберем индексы колонок с доп функциями
  helpHeader.map((helper, index) => {
    switch (helper) {
      case "connect(ч.)":
        helpersIndexObj.connectors.connectHour.columns = helpersIndexObj.connectors.connectHour.columns.concat(index);
        break;
      case "connect($)":
        helpersIndexObj.connectors.connectDollar.columns = helpersIndexObj.connectors.connectDollar.columns.concat(index);
        break;
      case "connect(%)":
        helpersIndexObj.connectors.connectPercent.columns = helpersIndexObj.connectors.connectPercent.columns.concat(index);
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
      case "dMax(connect(…))":
        helpersIndexObj.dMaxConnectDots = helpersIndexObj.dMaxConnectDots.concat(index);
        break;
      case "price($)":
        helpersIndexObj.priceDollar.columns = helpersIndexObj.priceDollar.columns.concat(index);
        break;
      case "image":
        helpersIndexObj.image = helpersIndexObj.image.concat(index);
        break;
      case "total":
        helpersIndexObj.image = helpersIndexObj.total.concat(index);
        break;
      default:
    }
    return null;
  });
  console.log(helpersIndexObj.connectors);
  //отфильтровываем компании без данных и сохраняем их в отдельный массив noDataCompanies
  const noDataCompanies = fullData.filter(row => row.length <= 3);
  console.log(noDataCompanies);
  const data = fullData.filter(row => row.length > 3);

  // убираем из данных заголовки
  data.splice(0, 3);

  //собираем колонки которые будем считать. Здесь надо будет добавить возможность выбирать валюту. Пока загружаем тупо доллар
  const priceColumns = helpersIndexObj.priceDollar.columns;
  const priceConnector = helpersIndexObj.priceDollar.connector;
  const dMinColumns = helpersIndexObj.dMin;
  const dMaxColumns = helpersIndexObj.dMaxConnectDots;

  // функции для обработки helperHeader



  // функция -кальукулятор значений колонок
  const dataCounter = (dataRow, targetColumns, connector) => {
    if (connector) {
      return targetColumns.reduce(((acc, columnIndex) => {
        if (isNaN(dataRow[columnIndex])) {
          return acc;
        } else {
          const newAcc = acc + dataRow[columnIndex];
          dataRow[columnIndex] = String(dataRow[columnIndex]) + connector;
          return newAcc;
        }
      }), 0);

    } else {
      return targetColumns.reduce(((acc, columnIndex) => {
        if (isNaN(dataRow[columnIndex])) {
          return acc;
        } else {
          return acc + dataRow[columnIndex];
        }
      }), 0);
    }
  };

  //вызываем калькулятор и добавляем итоговые значения к нашим данным
  const countedData = data.reduce((acc, row) => {

    const rowDMin = dataCounter(row, dMinColumns);
    const rowDMax = dataCounter(row, dMaxColumns);
    const rowFullPrice = dataCounter(row, priceColumns, priceConnector);

    return [...acc, [...row, rowDMin, rowDMax, rowFullPrice]];
  }, []);

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

  //функция connector ддобавляет единицы измерения и т.п. из headerHelper
  const connector = (dataRow, targetColumns, connector) => {
    return targetColumns.map(targetIndex => {
      dataRow[targetIndex] = String(dataRow[targetIndex]) + connector;
      return null;
    });
  };

  const connectedData = countedData.map(row => {
    Object.keys(helpersIndexObj.connectors).map(connectorType => {
      const targetConnector = helpersIndexObj.connectors[connectorType]
      connector(row, targetConnector.columns, targetConnector.connector);
      return row;
    });
    return row;
  });
   
  //console.log('connectedData', connectedData, 'countedData', countedData);

  const exportData = {
    numericData: countedData,
    tablerows: connectedData,

    tableHeader: {
      header: header,
      headerShort: headerShort,
      headerToTranscript: headerToTranscript 
    }
  };

  return exportData;
}

export default headerHelpers;
