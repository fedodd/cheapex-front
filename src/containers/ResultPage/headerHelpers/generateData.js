export default (data, columnsArray) => {

  const flatColumns = columnsArray.reduce((acc, column) => [...acc, ...column.columns], [])

  const createRow = (columns, row) => {

    let updatedRow = {};
    columns.map((column, index) => {
      let cellData = {};
      //console.log(column, row);
      column.cellIndexes.map(rowIndex => {

        //console.log(row);

        cellData[rowIndex[1]] = row[rowIndex[0]];
        //console.log(rowIndex, cellData, rowIndex[0] );
      })
      updatedRow[column.accessor] = cellData;
    });

    return updatedRow;
  }



  return data.map(row => createRow(flatColumns, row));
}
