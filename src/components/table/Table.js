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
import { setStoreData } from "../../redux/actions";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import TableCell from "./tableCell";
import classes from "./Table.pcss";
//import classes from './Table.pcss';

function Table({ columns, /*data,*/ isFiltered }) {
  const dispatch = useDispatch();
  const rowId = Symbol.for("id");
  // Use the state and functions returned from useTable to build your UI
  const storeData = useSelector((state) => state.table.storeData, shallowEqual);

  const [data, setData] = useState([]);

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

  const rowClickHandler = (rowIndex) => {
    // we use here filtered rows cause we send in table only filtered rows
    // fixedRows
    if (fixedRows.includes(rowIndex)) {
      setFixedRows(fixedRows.filter((row) => row !== rowIndex));
    } else {
      let concatedFixed = [...fixedRows, rowIndex];
      let sortedFixedRows = storeData.reduce((acc, row) => {
        return concatedFixed.includes(row[rowId]) ? [...acc, row[rowId]] : acc;
      }, []);
      console.log("filtered", sortedFixedRows);
      setFixedRows(sortedFixedRows);
    }

    // console.log(rowIndex, fixedRows);
  };

  // Render the UI for your table

  const filteredRows = useSelector(
    (state) => state.filters.filteredRows,
    shallowEqual
  );

  //sorting

  const sortDirection = useSelector(
    (state) => state.filters.sortDirection,
    shallowEqual
  );

  const [sortedData, setSortingData] = useState(filteredRows);

  useEffect(() => {
    let NewSort = storeData;
    switch (sortDirection) {
      case "up":
        // let sortedData
        NewSort.sort((a, b) => {
          return a["Цена"]["price($)"] - b["Цена"]["price($)"];
        });

        break;
      case "down":
        NewSort.sort((b, a) => {
          return a["Цена"]["price($)"] - b["Цена"]["price($)"];
        });
        break;

      default:
        NewSort.sort((a, b) => {
          return a[rowId] - b[rowId];
        });
        break;
    }

    dispatch(setStoreData(NewSort));
    // here on sort direction we rebuild table
    let jsxData = storeData.map((row, index) => {
      let newRow = {};
      for (let [key, value] of Object.entries(row)) {
        newRow[key] = <TableCell column={key} data={value} />;
      }
      return newRow;
    });
    setData(jsxData);

    // and here we need fix sort

    let sortedFixedRows = storeData.reduce((acc, row) => {
      return fixedRows.includes(row[rowId]) ? [...acc, row[rowId]] : acc;
    }, []);
    setFixedRows(sortedFixedRows);
  }, [sortDirection]);

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
            // get id of row only by № - its bad
            let id = row.values["№"].props.data.value - 1;
            return !isFiltered || (isFiltered && filteredRows.includes(id)) ? (
              <tr
                // getProps={() => customProps}
                className={
                  fixedRows.includes(id)
                    ? classes.tr + " " + classes.is__fixed
                    : classes.tr
                }
                onClick={(e) => rowClickHandler(id)}
                {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={classes.td}
                      {...cell.getCellProps()}
                      style={
                        fixedRows.includes(id)
                          ? {
                              top: `${(fixedRows.indexOf(id) + 1) * 44}px`,
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
