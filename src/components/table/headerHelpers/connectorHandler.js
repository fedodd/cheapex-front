import React from "react";
const connectorHandler = (data, connector) => {

  const connectedData = data.map(row => {
   // let connectedRow = [];
  //вернем собранный ряд, если обычная колонка - вернем элемент, если из целевой выборки - присоединим значение к предыдущему элементу
    return row.reduce((acc, element, index) => {
      let currentElem = element;
      connector.columns.map(targetIndex => {
        if (targetIndex === index) {
          const prevElement = acc[acc.length - 1];
          acc[acc.length - 1] = <span><span>{prevElement}</span><span>{connector.unit}</span><span className="alignedValue">{row[index]}</span></span>;
        }
        return null;
      });
        return [...acc, currentElem];
    }, []);
  });
  return connectedData;
};

export default connectorHandler;
