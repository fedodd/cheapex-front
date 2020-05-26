export default (data, columnsArray) => {

  const flatColumns = columnsArray.reduce((acc, column) => [...acc, ...column.columns], [])

  const createRow = (columns, row, rowIndex) => {

    let updatedRow = {
      "Дней": {
        'dMin': 0,
        'dMax(connect(…))': 0
      },
      "Цена": {
        'price($)': 0
      }
    };


    columns.map(column => {
      let cellData = {};

      // cellINdex is a [index, name]
      column.cellIndexes.map(cellIndex => {
        cellData[cellIndex[1]] = row[cellIndex[0]];
        switch (cellIndex[1]) {
          case 'price($)':
          updatedRow['Цена']['price($)'] = calculator(updatedRow['Цена']['price($)'], row[cellIndex[0]]);
          break;
        case 'dMin':
          updatedRow['Дней']['dMin'] = calculator(updatedRow['Дней']['dMin'], row[cellIndex[0]]);
          break;
        case 'dMax(connect(…))':
          updatedRow['Дней']['dMax(connect(…))'] = calculator(updatedRow['Дней']['dMax(connect(…))'], row[cellIndex[0]]);
          break;
        default:
          break;
        }
      })
      //  Дней и Цена мы уже завели и посчитали, поэтому их не перезаписываем
      if (column.accessor !== 'Дней' && column.accessor !== 'Цена' )  {
        updatedRow[column.accessor] = cellData;
      }

    });
    updatedRow['№'] = {value: rowIndex};
    return updatedRow;
  }

  return data.map((row, index) => createRow(flatColumns, row, index+1));
}

function calculator (acc, item) {
  return isNaN(item) ? acc : acc + item;
}
