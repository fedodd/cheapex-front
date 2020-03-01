import React from "react";

export default (headerData) => {
  let columns = [];
  headerData[0].map((columnName, index) => {
    let columnType = headerData[3][index];
    if (!columns.hasOwnProperty(columnName)) {
      let header = null;
      headerData[2][index] === null ?
        header = <span className='transcriptWrapper'>{columnName}</span>
        : header = <span className='transcriptWrapper'>{headerData[2][index]}<span className='with_transcripted'>{columnName}</span></span>

      columns[columnName] =  {
        Header: header,
        id: columnName,
        columns: [{
          Header: columnName,
          id: columnName + '_',
          accessor: columnName + '_' + columnType,
          cellIndexes: [[index, columnType]],
          dataType: columnType
        }]
      }
    } else {

      if (['dMin', 'price($)', 'image'].find(elem => elem === columnType)) {
        columns[columnName].columns.push({
            Header: columnType,
            id: columnName + '_' + columnType,
            accessor: columnName + '_' + columnType,
            cellIndexes: [[index, columnType]],
            dataType: columnType
          })
      } else {
        const lastColumnIndex = columns[columnName].columns.length - 1;
        columns[columnName].columns[lastColumnIndex].cellIndexes.push([index, columnType]);
      }
    }

    return null;

  });

  columns = {
    ...columns,
    'Дней': {
      Header: 'Дней',
      id: 'Дней',
      columns: [
        {Header: '=Дней',
        accessor: 'Дней',
        dataType: null,
        cellIndexes: []},
      ]
    },
    'Цена': {
      Header: 'Цена',
      id: 'Цена',
      columns: [
        {Header: '=Цена',
        accessor: 'Цена',
        dataType: 'price($)',
        cellIndexes: []},
      ]
    }
  }

  let columnsArray = [];
  Object.values(columns).map(value => columnsArray.push(value));

  return columnsArray;
}
