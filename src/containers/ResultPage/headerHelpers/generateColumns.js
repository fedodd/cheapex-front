import React from 'react';
import classes from '../../../components/table/Table.pcss';
import CompanyTypeFilter from './filters/companyTypeFilter';
import ColumnFilter from './filters/columnFilter';

export default (headerData) => {
  let columns = [];

  headerData[0].map((columnName, index) => {
    let columnType = headerData[3][index];
    if (!columns.hasOwnProperty(columnName)) {
      columns[columnName] = {
        Header: setTableHeader(columnName, headerData[2][index]),
        id: columnName,
        columns: [
          {
            Header: columnName,
            id: columnName + '_',
            accessor: columnName + '_' + columnType,
            cellIndexes: [[index, columnType]],
            dataType: columnType,
          },
        ],
      };
    } else {
      if (['dMin', 'price($)', 'image'].find((elem) => elem === columnType)) {
        columns[columnName].columns.push({
          Header: columnType,
          id: columnName + '_' + columnType,
          accessor: columnName + '_' + columnType,
          cellIndexes: [[index, columnType]],
          dataType: columnType,
        });
      } else {
        const lastColumnIndex = columns[columnName].columns.length - 1;
        columns[columnName].columns[lastColumnIndex].cellIndexes.push([
          index,
          columnType,
        ]);
      }
    }

    return null;
  });

  columns = {
    '№': {
      Header: setTableHeader('№'),
      id: '№',
      columns: [
        {
          Header: '№',
          accessor: '№',
          dataType: null,
          cellIndexes: [],
        },
      ],
    },
    ...columns,
    Дней: {
      Header: setTableHeader('=Дней'),
      id: 'Дней',
      columns: [
        {
          Header: '=Дней',
          accessor: 'Дней',
          dataType: null,
          cellIndexes: [],
        },
      ],
    },
    Цена: {
      Header: setTableHeader('=Цена'),
      id: 'Цена',
      columns: [
        {
          Header: '=Цена',
          accessor: 'Цена',
          dataType: 'price($)',
          cellIndexes: [],
        },
      ],
    },
  };

  let columnsArray = [];
  Object.values(columns).map((value) => columnsArray.push(value));

  return columnsArray;
};

function setTableHeader(columnName, transcriptedName) {
  const alignedColumns = ['№', 'Ответили', 'Сертификат', 'Комиссия'];
  let classNames = alignedColumns.includes(columnName)
    ? classes.headerCell + ' ' + classes.is__aligned
    : classes.headerCell;

  let filter = null;
  console.log(columnName);
  switch (columnName) {
    case 'Веб-сайт':
      filter = <CompanyTypeFilter />;
      // console.log(filter);
      break;
    case 'Ответили':
      filter = <ColumnFilter />;
      console.log(filter);
      break;
    default:
      break;
  }
  const header =
    transcriptedName === null || transcriptedName === undefined ? (
      <span className={classNames}>
        {columnName} {filter}
      </span>
    ) : (
      <span className={classNames}>
        {transcriptedName}
        <span className={classes.transcript}>
          {columnName} {filter}
        </span>
      </span>
    );
  return header;
}
