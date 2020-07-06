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
  setFilteredRows,
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
  const filteredRows = useSelector(
    (state) => state.filters.filteredRows,
    shallowEqual
  );

  // set new days and price when update limits...

  const days = useSelector((state) => state.filters.days, shallowEqual);
  const price = useSelector((state) => state.filters.price, shallowEqual);
  const [isDaysFiltered, setIsDaysFiltered] = useState(false);
  const [isPriceFiltered, setIsPriceFiltered] = useState(false);

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
        // put all row indexex at filtered array
        const allrows = Array.from(Array(fullResults.data.length).keys());
        // console.log("allrows", allrows);

        dispatch(setFilteredRows(allrows));
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
  const [isNameFiltered, setIsNameFiltered] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const filterByHandler = () => {
    let filtered = storeData.reduce((acc, row) => {
      if (
        isNameFiltered &&
        !row["Веб-сайт_value"].value.includes(filterValue)
      ) {
        return acc;
      }

      if (
        (isDaysFiltered && days.max < row["Дней"]["dMax(connect(…))"]) ||
        days.min > row["Дней"]["dMin"]
      ) {
        return acc;
      }
      if (
        (isPriceFiltered && price.min > row["Цена"]["price($)"]) ||
        price.max < row["Цена"]["price($)"]
      ) {
        return acc;
      }

      return [...acc, row[rowId]];
    }, []);
    // console.log("filtered", filtered, filterValue);
    return filtered;
  };

  const rowId = Symbol.for("id");

  useEffect(() => {
    // this didnt work but we nned to do this check for optimization
    // filterValue === "" ? setIsNameFiltered(false) : setIsNameFiltered(true);
    setIsNameFiltered(true);
    let newFilteredRows = filterByHandler();

    dispatch(setFilteredRows(newFilteredRows), shallowEqual);
  }, [filterValue]);

  // filter by days and price

  useEffect(() => {
    setIsDaysFiltered(true);
    let newFilteredRows = filterByHandler();
    dispatch(setFilteredRows(newFilteredRows), shallowEqual);
  }, [days]);

  useEffect(() => {
    setIsPriceFiltered(true);
    let newFilteredRows = filterByHandler();
    dispatch(setFilteredRows(newFilteredRows), shallowEqual);
  }, [price]);

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
        <Search filterHandler={(target) => setFilterValue(target)} />
      </div>
      <div className={classes.resultPage} ref={sliderRef}>
        {loading ? (
          <p>loading</p>
        ) : (
          <Table
            columns={tableColumns}
            data={tableData}
            isFiltered={isNameFiltered || isDaysFiltered || isPriceFiltered}
          />
        )}
      </div>
    </div>
  );
}

export default ResultPage;
