import React from 'react';

const addUnitHandler = (data, addons) => { 
  let withUnitData = data.slice();
  //функция connector добавляет единицы измерения и т.п. из headerHelper
  const addUnit = (dataRow, targetColumns, unit) => {
    return targetColumns.map(targetIndex => {
      
      const currentElem = dataRow[targetIndex];
      if ((!isNaN(currentElem)) || (!isNaN(String(currentElem).replace(",", ".")))) {

        if (targetIndex === targetColumns[targetColumns.length - 1] && unit ==='$') {
          dataRow[targetIndex] = <div className="with__equally"><span>= </span><span className="is__rightAlign">{String(currentElem).replace(".", ",") + ' ' + unit}</span></div> 
        } else {
          dataRow[targetIndex] = <span className="is__rightAlign">{String(currentElem).replace(".", ",") + ' ' + unit}</span>
        }
        
      } else {
        
        if (targetIndex === targetColumns[targetColumns.length - 1] && unit === '$') {
          dataRow[targetIndex] = <div className="with__equally"><span>= </span><span className="is__rightAlign">{currentElem}</span></div> 
        } else {
          dataRow[targetIndex] = <span className="is__rightAlign">{currentElem}</span>
        }
      }
      return null;
    });
  };

  return withUnitData.map(row => {
    Object.keys(addons).map(addon => {
      const targetAddon = addons[addon];
      addUnit(row, targetAddon.columns, targetAddon.unit);
      return row;
    });
    return row;
  });

};

export default addUnitHandler;
