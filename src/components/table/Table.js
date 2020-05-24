import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo
} from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import classes from './Table.pcss';
//import classes from './Table.pcss';

function Table({ columns, data, filteredRows, isFiltered }) {
  // Use the state and functions returned from useTable to build your UI

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

  const lastColumnRef = useRef();

  const [lastColumnWidth, setLastColumnWidth] = useState(0)
  const [firstColumnWidth, setFirstColumnWidth] = useState(0)

  useEffect(() => {
    if (lastColumnRef && lastColumnRef.current) {
      // problem need to id it by ref, not by getelementId
      setLastColumnWidth(document.getElementById('lastColumn').getBoundingClientRect().width)
      setFirstColumnWidth(document.getElementById('firstColumn').getBoundingClientRect().width)
    }
  }, lastColumnRef.current)

   // no need to set id if fix getelementbyid problem
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
            // filter rows only if array is not empty
            return ( !isFiltered || (isFiltered && filteredRows.includes(i))) ?
            (
              <tr className={classes.tr} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className={classes.td} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
            : null}
        )}
      </tbody>
    </table>
  )
}

export default Table;
