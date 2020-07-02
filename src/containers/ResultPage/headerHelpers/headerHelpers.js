import React from "react";

import generateColumns from "./generateColumns";
import generateData from "./generateData";

const headerHelpers = (fullData) => {
  let toJsonData = [...fullData];
  let header = toJsonData.slice(0, 4);
  const columns = generateColumns(header);

  //первые четыре строки это хедер
  const cleanedData = toJsonData.slice(4);
  //filter from not answered
  let filteredData = cleanedData.filter((row) => !isNaN(row[1]));

  const superData = generateData(filteredData, columns);

  // need to set this part of code to generated data maybe or to another module

  let dMin = superData[0]["Дней"]["dMin"];
  let dMax = superData[0]["Дней"]["dMax(connect(…))"];
  let priceMin = superData[0]["Цена"]["price($)"];
  let priceMax = superData[0]["Цена"]["price($)"];

  superData.map((row) => {
    if (row["Дней"]["dMin"] < dMin) {
      dMin = row["Дней"]["dMin"];
    }
    if (row["Дней"]["dMax(connect(…))"] > dMax) {
      dMax = row["Дней"]["dMax(connect(…))"];
    }
    if (row["Цена"]["price($)"] < priceMin) {
      priceMin = row["Цена"]["price($)"];
    } else if (row["Цена"]["price($)"] > priceMax) {
      priceMax = row["Цена"]["price($)"];
    }
  });

  let endPoints = {
    days: {
      min: dMin,
      max: dMax,
    },
    price: {
      min: priceMin,
      max: priceMax,
    },
  };

  return {
    columns: columns,
    data: superData,
    endPoints,
  };
};

export default headerHelpers;
