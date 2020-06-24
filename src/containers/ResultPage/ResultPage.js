import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
//import { Route } from 'react-router-dom';
// import Filters from "../../components/filters/Filters";
import headerHelpers from './headerHelpers/headerHelpers';
import Table from '../../components/table/Table';
import TableCell from '../../components/table/tableCell';
import clickDrugHandler from '../../functions/clickDrug';
import Search from '../../components/filters/search/Search';

import classes from './ResultPage.pcss';
import tableClasses from '../../components/table/Table.pcss';

// import declOfNum from "../../functions/declOfNum";
// import {
//   useTable,
// } from "react-table";
// //import filterByValue from "../../functions/filterByValue";
// import arrayMinMax from '../../functions/arrayMinMax';
// import deepCopyArray from "../../functions/deepCopyArray";
// import Spinner from "../../components/spinner/Spinner";
// import clickDrugHandler from "../../functions/clickDrug";

import RangeFilter from '../ResultPage/headerHelpers/filters/rangeFilter';

function ResultPage(props) {
  // const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [dirtyData, setDirtyData] = useState([]);

  useEffect(() => {
    const fullpath =
      'https://react-app-bc4e6.firebaseio.com/importedSheet/' +
      props.link +
      '.json';
    const fetchData = async () => {
      const result = await axios(fullpath);
      const fullData = result.data.data;
      const fullResults = headerHelpers(fullData);
      setDirtyData(fullResults.data);
      let jsxData = fullResults.data.map((row, index) => {
        let newRow = {};
        // // add symbol to hide id - index of row
        // let id = Symbol('id');

        // newRow[id] = index;
        for (let [key, value] of Object.entries(row)) {
          newRow[key] = <TableCell column={key} data={value} />;
        }
        return newRow;
      });

      setTableData(jsxData);
      setTableColumns(fullResults.columns);
      setLoaded(true);
    };
    fetchData();
  }, []);

  // filter block
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  const filterHandler = (target) => {
    setFilterValue(target);
    setIsFiltered(true);
  };

  useEffect(() => {
    const newFilteredRows = dirtyData.reduce((acc, row, index) => {
      return row['Веб-сайт_value'].value.includes(filterValue)
        ? acc.concat(index)
        : acc;
    }, []);
    setFilteredRows(newFilteredRows);
  }, [filterValue]);

  //scrolling table
  const sliderRef = useRef();

  useEffect(() => {
    const slider = sliderRef.current;
    clickDrugHandler(sliderRef.current);

    // this thing must do in another function and use it after resize window
    if (slider.scrollWidth !== slider.clientWidth) {
      if (slider.scrollWidth - slider.clientWidth <= slider.scrollLeft + 5) {
        slider.classList.remove(tableClasses.is__end);
      } else {
        slider.classList.add(tableClasses.is__end);
      }
    }
  }, [loaded]);

  return (
    <div className={classes.resultPageWrapper}>
      <div>
        <Search filterHandler={filterHandler} />
      </div>
      <div className={classes.resultPage} ref={sliderRef}>
        {loaded ? (
          <Table
            columns={tableColumns}
            data={tableData}
            isFiltered={isFiltered}
            filteredRows={filteredRows}
          />
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
