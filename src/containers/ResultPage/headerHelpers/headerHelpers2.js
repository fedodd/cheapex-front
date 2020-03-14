//import React from "react";
import generateColumns from "./generateColumns";
import generateData from "./generateData";
// import deepCopy from "../../../functions/deepCopyArray";
// import calculateFunc from "./calculateFunc";

const headerHelpers = (fullData) => {

  let toJsonData = [...fullData];
  let header = toJsonData.slice(0, 4);
  const columns = generateColumns(header);

    //первые четыре строки это хедер
  const cleanedData = toJsonData.slice(4);
    //filter from not answered
  let filteredData = cleanedData
    .filter(row => !isNaN(row[1]));

  const superData = generateData(filteredData, columns);

  return {
    columns: columns,
    data: superData
  };
}

export default headerHelpers;
