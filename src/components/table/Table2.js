import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect
} from 'react';
import { useTable } from 'react-table';
import classes from './Table2.pcss';
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

  useEffect(() => {
    if (lastColumnRef && lastColumnRef.current) {
      setLastColumnWidth(document.getElementById('lastColumn').offsetWidth)
    }
  }, lastColumnRef.current)



  // Render the UI for your table
  return (
    <table
      {...getTableProps()}
      className={classes.table}>
      <style>{`
        :root {
          --lastColumnWidth: ${lastColumnWidth}px;
          }
        `}
      </style>
      <thead className={classes.thead}>
        {headerGroups.map(headerGroup => (

          <tr className={classes.tr + ' ' + classes.__head} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index)=> {
              if (headerGroup.headers.length - 1 === index) {
                console.log(column)
                return (
                  <th
                    className={classes.th}
                    ref={lastColumnRef}
                    id='lastColumn'
                    {...column.getHeaderProps()}
                    >{column.render('Header')}
                  </th>
                )
              }
              return (
                <th
                  className={classes.th}
                  {...column.getHeaderProps()}
                  >{column.render('Header')}
                </th>
              )

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
