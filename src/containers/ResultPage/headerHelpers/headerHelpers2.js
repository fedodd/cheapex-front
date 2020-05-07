import generateColumns from "./generateColumns";
import generateData from "./generateData";

const headerHelpers = (fullData) => {

  let toJsonData = [...fullData];
  let header = toJsonData.slice(0, 4);
  const columns = generateColumns(header);

  // for (let i = 4; i < toJsonData.length; i++) {
  //   let rowData = {
  //     days: {
  //       title: '=Дней',
  //       shortName: null,
  //       dMax: null,
  //       dMin: null,
  //     },
  //     price: {
  //       title: '=Цена',
  //       shortName: null,
  //       totalPrice: null,
  //     }
  //   };

  //   toJsonData[0].map((column, index) => {
  //     if (!rowData.hasOwnProperty(column)) {

  //       // [3] - type of data, toJsonData[i][index] - value for each row
  //       rowData[column] = {
  //         // header: {
  //         //   dataType:
  //         // },
  //         [toJsonData[3][index]]: toJsonData[i][index],
  //       };
  //       // calculate data for summary columns put column name, index, imported row data and row obj
  //       rowData = calculateFunc(toJsonData[3][index], index, toJsonData[i], rowData);

  //     } else {
  //       // calculate data for summary columns
  //       rowData = calculateFunc(toJsonData[3][index], index, toJsonData[i], rowData);

  //       //if hint prop already exsist then add prop name that need to hint
  //       if (toJsonData[3][index] === 'hint' && rowData[column].hasOwnProperty('hint') ) {
  //         rowData[column]['hint_' + toJsonData[3][index-1]] = toJsonData[i][index];
  //       }

  //       rowData[column][toJsonData[3][index]] = toJsonData[i][index];
  //     }
  //   });

  //   jsonData = [...jsonData, rowData];
  // }
  // console.log(jsonData)



    //первые четыре строки это хедер
  const cleanedData = toJsonData.slice(4);
    //filter from not answered
  let filteredData = cleanedData
    .filter(row => !isNaN(row[1]));
  // filteredData.forEach(row => {
  //   calculateFunc(row);
  // });

  const superData = generateData(filteredData, columns);

  return {
    columns: columns,
    data: superData
  };
}

export default headerHelpers;
