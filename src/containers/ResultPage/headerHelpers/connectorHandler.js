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
         
          //если коннектор - три точки нам надо выравнить цифры по колонке...
          if (connector.unit === '...') {
            if (targetIndex === connector.columns[connector.columns.length-1]) {
              acc[acc.length - 1] = <div className="dotsConnected"><span>= </span><span className="alignedValue"> {prevElement}</span><span> {connector.unit} </span><span className="alignedValue">{row[index]}</span></div>;

              if (prevElement === row[index]) {
                acc[acc.length - 1] = <div className="dotsConnected"><span>= </span><span className="alignedValue"></span> {connector.unit} <span className="alignedValue">{row[index]}</span></div>;
              }
            } else {
              acc[acc.length - 1] = <div className="dotsConnected"><span className="alignedValue">{prevElement}</span><span> {connector.unit} </span><span className="alignedValue">{row[index]}</span></div>;
              // если min value === max value то покажем только max.
              if (prevElement === row[index]) {
                acc[acc.length - 1] = <div className="dotsConnected"><span className="alignedValue"></span> {connector.unit} <span className="alignedValue">{row[index]}</span></div>;
              }
            }


            
            
            
          } else {
            acc[acc.length - 1] = <div className="arrowConnected"><span className="alignedValue__big">{prevElement}</span><span> {connector.unit} </span><span>{row[index]}</span></div>;
          }
          
        }
        return null;
      });
        return [...acc, currentElem];
    }, []);
  });
  return connectedData;
};

export default connectorHandler;
