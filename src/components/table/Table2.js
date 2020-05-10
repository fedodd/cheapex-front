import React from 'react';
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

  // Render the UI for your table
  return (
    <table {...getTableProps()} className={classes.table}>
      <thead className={classes.thead}>
        {console.log(headerGroups)}
        {headerGroups.map(headerGroup => (

          <tr className={classes.tr + ' ' + classes.__head} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className={classes.th} {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
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
