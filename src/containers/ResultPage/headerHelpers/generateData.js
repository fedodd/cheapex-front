export default (data, columnsArray) => {

  const flatColumns = columnsArray.reduce((acc, column) => [...acc, ...column.columns], [])


  const createRow = (columns, data) => {
    let row = {};
    console.log(columns)
    columns.map((column, index) => {
      let cellData = {...data[column.Header], dataType: column.dataType}
      row[column.accessor] = cellData;
    });

    return row;
  }

  return data.map(row => createRow(flatColumns, row));
}
