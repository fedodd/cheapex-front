const calculateHandler = (data, calculators) => {
  //console.log('data', data);
  //собираем колонки которые будем считать. Здесь надо будет добавить возможность выбирать валюту. Пока загружаем тупо доллар
  const priceColumns = calculators.priceDollar.columns;
  const dMinColumns = calculators.dMin;
  const dMaxColumns = calculators.dMaxConnectDots.columns;

  // функция -кальукулятор значений колонок
  const calculator = (dataRow, targetColumns) => {
    return targetColumns.reduce(((acc, columnIndex) => {
      if (isNaN(dataRow[columnIndex])) {
        return acc;
      } else {
        return acc + dataRow[columnIndex];
      }
    }), 0);
  };

  //вызываем калькулятор и добавляем итоговые значения к нашим данным
  const calculatedData = data.reduce((acc, row) => {
    const rowDMin = calculator(row, dMinColumns);
    const rowDMax = calculator(row, dMaxColumns);
    const rowFullPrice = calculator(row, priceColumns);
    return [...acc, [...row, rowDMin, rowDMax, rowFullPrice]];
  }, []);
  //console.log('calculatedData', calculatedData[0][31]);
  return calculatedData;
};

export default calculateHandler;
