import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import axios from "axios";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import {
  setLimits,
  setStoreData,
  setErrorOnLoad,
  setFilterDays,
  setFilterPrice,
} from "../../redux/actions";
import headerHelpers from "./headerHelpers/headerHelpers";
import Table from "../../components/table/Table";
import TableCell from "../../components/table/tableCell";
import clickDrugHandler from "../../functions/clickDrug";
import Search from "../../components/filters/search/Search";

import classes from "./ResultPage.pcss";
import tableClasses from "../../components/table/Table.pcss";

//import { Route } from 'react-router-dom';
// import Filters from "../../components/filters/Filters";
// import declOfNum from "../../functions/declOfNum";
// import {
//   useTable,
// } from "react-table";
// //import filterByValue from "../../functions/filterByValue";
// import arrayMinMax from '../../functions/arrayMinMax';
// import deepCopyArray from "../../functions/deepCopyArray";
// import Spinner from "../../components/spinner/Spinner";
// import clickDrugHandler from "../../functions/clickDrug";

import RangeFilter from "../ResultPage/headerHelpers/filters/rangeFilter";

function ResultPage(props) {
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [payload, setPayload] = useState(null);

  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  const storeData = useSelector((state) => state.table.storeData, shallowEqual);
  const limits = useSelector((state) => state.table.limits, shallowEqual);

  // set new days and price when update limits...

  const days = useSelector((state) => state.filters.days, shallowEqual);
  const price = useSelector((state) => state.filters.price, shallowEqual);
  useEffect(() => {
    dispatch(setFilterDays(limits.days), shallowEqual);
    dispatch(setFilterPrice(limits.price), shallowEqual);
    // dispatch(setEndPoints(limits), shallowEqual);
  }, [limits]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fullpath =
      "https://react-app-bc4e6.firebaseio.com/importedSheet/" +
      props.link +
      ".json";
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await axios(fullpath);
        const fullData = result.data.data;
        const fullResults = headerHelpers(fullData);

        dispatch(setStoreData(fullResults.data));
        dispatch(setLimits(fullResults.limits));

        let jsxData = fullResults.data.map((row, index) => {
          let newRow = {};
          // newRow[id] = index;
          for (let [key, value] of Object.entries(row)) {
            newRow[key] = <TableCell column={key} data={value} />;
          }
          return newRow;
        });
        setTableData(jsxData);
        setTableColumns(fullResults.columns);
        setLoading(false);
      } catch (err) {
        console.log(err);

        // перехватит любую ошибку в блоке try: и в fetch, и в response.json
        // alert(err);
        dispatch(setErrorOnLoad(err));
        setLoadError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // filter company name block
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  const filterHandler = (target) => {
    setFilterValue(target);
    setIsFiltered(true);
  };

  useEffect(() => {
    const newFilteredRows = storeData.reduce((acc, row, index) => {
      return row["Веб-сайт_value"].value.includes(filterValue)
        ? acc.concat(index)
        : acc;
    }, []);
    setFilteredRows(newFilteredRows);
  }, [filterValue]);

  useEffect(() => {
    const newFilteredRows = storeData.reduce((acc, row, index) => {
      return row["Дней"]["dMin"] >= days.min &&
        row["Дней"]["dMax(connect(…))"] <= days.max
        ? acc.concat(index)
        : acc;
    }, []);
    setIsFiltered(true);
    setFilteredRows(newFilteredRows);
  }, [days]);

  useEffect(() => {
    const newFilteredRows = storeData.reduce((acc, row, index) => {
      return row["Цена"]["price($)"] >= price.min &&
        row["Цена"]["price($)"] <= price.max
        ? acc.concat(index)
        : acc;
    }, []);
    setIsFiltered(true);
    setFilteredRows(newFilteredRows);
  }, [price]);

  useEffect(() => {
    console.log("filteredRows", filteredRows);
  }, [filteredRows]);

  //scrolling table
  const sliderRef = useRef();

  useEffect(() => {
    if (!loading) {
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
    }
  }, [loading]);

  return (
    <div className={classes.resultPageWrapper}>
      <div>
        <Search filterHandler={filterHandler} />
      </div>
      <div className={classes.resultPage} ref={sliderRef}>
        {loading ? (
          <p>loading</p>
        ) : (
          <Table
            limits={limits}
            columns={tableColumns}
            data={tableData}
            isFiltered={isFiltered}
            filteredRows={filteredRows}
          />
        )}
      </div>
    </div>
  );
}

export default ResultPage;
