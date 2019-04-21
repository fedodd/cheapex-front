const connectorHandler = (data, connector) => {

  const connectedData = data.map(row => {
   // let connectedRow = [];
  //вернем собранный ряд, если обычная колонка - вернем элемент, если из целевой выборки - присоединим значение к предыдущему элементу
    return row.reduce((acc, element, index) => {
      let currentElem = element;
      connector.columns.map(targetIndex => {
        if (targetIndex === index) {
          const prevElement = acc[acc.length - 1];
          acc[acc.length - 1] = (prevElement + connector.unit + row[index]);
          //   Так как не будем прибавлять к ряду этот элемент вернем false
  //        currentElem = false;
        }
        return null;
      });
      
  //    if (currentElem === false) {
   //     return acc;
   //   } else {
        return [...acc, currentElem];
   //   }
    }, []);
  });
  return connectedData;
};

export default connectorHandler;
