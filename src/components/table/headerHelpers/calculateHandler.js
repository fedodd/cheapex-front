const calculateHandler = (data, calculators) => {

  //собираем колонки которые будем считать. Здесь надо будет добавить возможность выбирать валюту. Пока загружаем тупо доллар
  const priceColumns = calculators.priceDollar.columns;
  const priceUnit = calculators.priceDollar.unit;
  console.log(priceUnit);
  const dMinColumns = calculators.dMin;
  const dMaxColumns = calculators.dMaxConnectDots;

  // функция -кальукулятор значений колонок
  const calculator = (dataRow, targetColumns, unit) => {
    return targetColumns.reduce(((acc, columnIndex) => {
      if (isNaN(dataRow[columnIndex])) {
        return acc;
      } else {
        return acc + dataRow[columnIndex];
      }
    }), 0);
  };

  //вызываем калькулятор и добавляем итоговые значения к нашим данным
  const countedData = data.reduce((acc, row) => {

    const rowDMin = calculator(row, dMinColumns);
    const rowDMax = calculator(row, dMaxColumns);
    const rowFullPrice = calculator(row, priceColumns, priceUnit);
    return [...acc, [...row, rowDMin, rowDMax, rowFullPrice]];
  }, []);

  return countedData;
};

export default calculateHandler;
