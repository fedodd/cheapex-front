const addUnitHandler = (data, addons) => {
  //функция connector добавляет единицы измерения и т.п. из headerHelper
  const addUnit = (dataRow, targetColumns, unit) => {
    return targetColumns.map(targetIndex => {
      const currentElem = dataRow[targetIndex];
      if ((!isNaN(currentElem)) || (!isNaN(String(currentElem).replace(",", ".")))) {
        dataRow[targetIndex] = String(currentElem).replace(".", ",") + unit;
      }
      return null;
    });
  };

  return data.map(row => {
    Object.keys(addons).map(addon => {
      const targetAddon = addons[addon];
      addUnit(row, targetAddon.columns, targetAddon.unit);
      return row;
    });
    return row;
  });

};

export default addUnitHandler;
