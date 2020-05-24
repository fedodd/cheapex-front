import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from "axios";
//import { Route } from 'react-router-dom';
// import Filters from "../../components/filters/Filters";
import headerHelpers from "./headerHelpers/headerHelpers";
import Table from '../../components/table/Table';
import TableCell from '../../components/table/tableCell';
import clickDrugHandler from "../../functions/clickDrug";
import Search from "../../components/filters/search/Search";

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




function ResultPage(props) {

  // const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([

    // {web: '12',
    // answered: '2',
    // office: '3',
    // shipChina: '3',
    // shipWorld: '4',
    // shipRussia: '5',
    // repack: '6',
    // customsFee: '7',
    // certificate: '8',
    // insurance: '9',
    // commission: '0',
    // days: '1',
    // price: '2'}
  ]);
  const [columns, setColumns] = useState([
    // {Header: 'web', accessor: 'web'},
    // {Header: 'answered', accessor: 'answered'},
    // {Header: 'office', accessor: 'office'},
    // {Header: 'shipChina', accessor: 'shipChina'},
    // {Header: 'shipWorld', accessor: 'shipWorld'},
    // {Header: 'shipRussia', accessor: 'shipRussia'},
    // {Header: 'repack', accessor: 'repack'},
    // {Header: 'customsFee', accessor: 'customsFee'},
    // {Header: 'certificate', accessor: 'certificate'},
    // {Header: 'insurance', accessor: 'insurance'},
    // {Header: 'commission', accessor: 'commission'},
    // {Header: 'days', accessor: 'days'},
    // {Header: 'price', accessor: 'price'}
  ]);

  useEffect(() => {
    const fullpath = 'https://react-app-bc4e6.firebaseio.com/importedSheet/' + props.link + '.json';
    const fetchData = async () => {
      const result = await axios(fullpath);
      console.log(result);

      const fullData = result.data.data;
      // const fullData = serverData;

      const fullResults = headerHelpers(fullData);

      let jsxData = fullResults.data.map(row => {
        let newRow = {};
        for ( let [key, value] of Object.entries(row)) {
          newRow[key] = <TableCell column={key} data={value}/>
        }
        return newRow;
      });
      setData(jsxData);
      setColumns(fullResults.columns);
      setLoaded(true);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   // const fullpath = 'https://react-app-bc4e6.firebaseio.com/importedSheet/' + props.link + '.json';
  //   // axios.get(fullpath).then(response => {
  //   //   const fullData = response.data.data;
  //   //   let results = headerHelpers(fullData);
  //   //   console.log('i am here', fullData);
  //   //   const tableColumns = useMemo(() => headerHelpers(fullData), [fullData]);
  //   //   setColumns(tableCoumns);
  //   //   //const tableData = useMemo(() => headerHelpers(fullData), [fullData]);
  //   //   //console.log(tableColumns, tableData);
  //   //   //setData(results.data);
  //   // }).catch(error => {
  //   //   console.log('error!', error);
  //   //   alert('error!');
  //   //   setError(error);
  //   //   // здесь надо прописать сценарии по ошибкам. а где-тоо выше - ловить ошибки - например файл не в том формате или типа того
  //   // });
  // }, []);


  const filterHandler = (target) => {
    console.log(target)
    console.log(data, columns)
  }

  const sliderRef = useRef();

  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(()=> {
    const slider = sliderRef.current;
    if (slider.scrollWidth !== slider.clientWidth) {
      if ((slider.scrollWidth - slider.clientWidth) <= slider.scrollLeft + 5) {
        slider.classList.remove(tableClasses.is__end);
      } else {
        slider.classList.add(tableClasses.is__end);
      }
    }
  }, [loaded])

  return (
    <div  className={classes.resultPageWrapper}>
      <div>
        <Search filterHandler={filterHandler}/>
        {/* <button></button> */}
      </div>
      <div
        className={classes.resultPage}
        ref={sliderRef}
        onScroll={e=> setTimeout(e=> clickDrugHandler(sliderRef.current), 100)}
      >
        {loaded ? <Table columns={columns} data={data} /> : <p>loading</p>}
      </div>
    </div>
  );
}

export default ResultPage;
