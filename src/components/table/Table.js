import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect
} from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import classes from './Table.pcss';
//import classes from './Table.pcss';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  // const memoColumns = React.useMemo(() => columns, []);
  // const memoData = [React.useMemo(() => data, [])]

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });
  //console.log(columns, data);

  const lastColumnRef = useRef();

  const [lastColumnWidth, setLastColumnWidth] = useState(0)
  const [firstColumnWidth, setFirstColumnWidth] = useState(0)

  useEffect(() => {
    if (lastColumnRef && lastColumnRef.current) {
      setLastColumnWidth(document.getElementById('lastColumn').getBoundingClientRect().width)
      setFirstColumnWidth(document.getElementById('firstColumn').getBoundingClientRect().width)
    }
  }, lastColumnRef.current)

  const setIdToTh = (column, index, arrayLength) => {
    let addedProps = {
      id: null,
      ref: null
    };
    switch (index) {
      case 0:
        addedProps.id = 'firstColumn'
        break;
      case (arrayLength-1):
        addedProps.id = 'lastColumn'
        addedProps.ref= lastColumnRef
        break;

      default:
        break;
    }

    // console.log({ id })
    return  <th
              className={classes.th}
              {...addedProps}
              {...column.getHeaderProps()}
              >{column.render('Header')}
            </th>
  }


  // Render the UI for your table
  return (
    <table
      filterable
      defaultFilterMethod={(filter, row) =>
      String(row[filter.id]) === filter.value}
      {...getTableProps()}
      className={classes.table}>
      <style>{`
        :root {
          --lastColumnWidth: ${lastColumnWidth}px;
          --firstColumnWidth: ${firstColumnWidth}px;
          }
        `}
      </style>
      <thead className={classes.thead}>
        {headerGroups.map(headerGroup => (

          <tr className={classes.tr + ' ' + classes.__head} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index)=> {
              return setIdToTh(column, index, headerGroup.headers.length)
            })}
          </tr>
        ))}
      </thead>
      <tbody className={classes.tbody} {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr className={classes.tr} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className={classes.td} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
  )
}

export default Table;
