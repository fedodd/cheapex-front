export default (data, columnsArray) => {

  const flatColumns = columnsArray.reduce((acc, column) => [...acc, ...column.columns], [])

  const createRow = (columns, row) => {

    let updatedRow = {
      "Дней": {
        'dMin': 0,
        'dMax(connect(…))': 0
      },
      "Цена": {
        value: 0
      }
    };


    columns.map((column, index) => {
      let cellData = {};
      column.cellIndexes.map(rowIndex => {

        cellData[rowIndex[1]] = row[rowIndex[0]];
        switch (rowIndex[1]) {
          case 'price($)':
          updatedRow['Цена']['value'] = calculator(updatedRow['Цена']['value'], row[rowIndex[0]]);
          break;
        case 'dMin':
          updatedRow['Дней']['dMin'] = calculator(updatedRow['Дней']['dMin'], row[rowIndex[0]]);
          break;
        case 'dMax(connect(…))':
          updatedRow['Дней']['dMax(connect(…))'] = calculator(updatedRow['Дней']['dMax(connect(…))'], row[rowIndex[0]]);
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

    return updatedRow;
  }

  return data.map(row => createRow(flatColumns, row));
}

function calculator (acc, item){
  return isNaN(item) ? acc : acc + item;
}
