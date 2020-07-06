import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import classes from "./Table.pcss";
//import classes from './Table.pcss';

function Table({ columns, data, isFiltered }) {
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

  const [lastColumnWidth, setLastColumnWidth] = useState(0);
  const [firstColumnWidth, setFirstColumnWidth] = useState(0);

  useEffect(() => {
    if (lastColumnRef && lastColumnRef.current) {
      // problem need to id it by ref, not by getelementId
      setLastColumnWidth(
        document.getElementById("lastColumn").getBoundingClientRect().width
      );
      setFirstColumnWidth(
        document.getElementById("firstColumn").getBoundingClientRect().width
      );
    }
  }, lastColumnRef.current);

  // no need to set id if fix getelementbyid problem
  const setIdToTh = (column, index, arrayLength) => {
    let addedProps = {
      id: null,
      ref: null,
    };
    switch (index) {
      case 0:
        addedProps.id = "firstColumn";
        break;
      case arrayLength - 1:
        addedProps.id = "lastColumn";
        addedProps.ref = lastColumnRef;
        break;

      default:
        break;
    }

    // console.log({ id })
    return (
      <th className={classes.th} {...addedProps} {...column.getHeaderProps()}>
        {column.render("Header")}
      </th>
    );
  };

  // fix rows
  const [fixedRows, setFixedRows] = useState([]);
  // const [fixedRowsHeight, setFixedRowsHeight] = useState(44);

  const rowClickHandler = (rowIndex) => {
    // we use here filtered rows cause we send in table only filtered rows

    fixedRows.includes(rowIndex)
      ? setFixedRows(fixedRows.filter((row) => row !== rowIndex))
      : setFixedRows(fixedRows.concat(rowIndex).sort((a, b) => a - b));

    // console.log(rowIndex, fixedRows);
  };

  // Render the UI for your table

  const filteredRows = useSelector(
    (state) => state.filters.filteredRows,
    shallowEqual
  );

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <style>
          {`
          :root {
            --lastColumnWidth: ${lastColumnWidth}px;
            --firstColumnWidth: ${firstColumnWidth}px;
            --fixedRows: ${fixedRows.length * 44}px;
            }
          `}
        </style>
        <thead className={classes.thead}>
          {headerGroups.map((headerGroup) => (
            <tr className={classes.tr} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                return setIdToTh(column, index, headerGroup.headers.length);
              })}
            </tr>
          ))}
        </thead>
        <tbody className={classes.tbody} {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            // filter rows only if array is not empty
            return !isFiltered || (isFiltered && filteredRows.includes(i)) ? (
              <tr
                className={
                  fixedRows.includes(row.id)
                    ? classes.tr + " " + classes.is__fixed
                    : classes.tr
                }
                onClick={(e) => rowClickHandler(row.id)}
                {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={classes.td}
                      {...cell.getCellProps()}
                      style={
                        fixedRows.includes(row.id)
                          ? {
                              top: `${(fixedRows.indexOf(row.id) + 1) * 44}px`,
                            }
                          : {
                              top: "auto",
                            }
                      }>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
