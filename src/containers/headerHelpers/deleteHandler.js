import { isArray } from "util";

const deleteHandler = (data, deleteColumns) => {

  if (isArray(data)) {
    const cleanedData = data.map(row => {
      return row.filter((elem, index) => {
        let currentElem = elem;
        deleteColumns.map(deleteIndex => (index === deleteIndex) ? currentElem = false : true);
        return currentElem;
      });
    });

    return cleanedData;
  } else {
    const cleanedData = {};
    Object.keys(data).map(rowKey => {
      cleanedData[rowKey] = data[rowKey].filter((elem, index) => {
        let currentElem = elem;
        deleteColumns.map(deleteIndex => (index === deleteIndex) ? currentElem = false : true);
        return currentElem;
      });
      return null;
    });

    return cleanedData;
  }

  
  
}

export default deleteHandler;
