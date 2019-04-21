const deleteHandler = (data, deleteColumns) => {
  
  const cleanedData = data.map(row => {
 
    return row.filter((elem, index) => {
      let currentElem = elem;
      deleteColumns.map(deleteIndex => (index === deleteIndex) ? currentElem = false : true);
      return currentElem;
    });
  });
  
  return cleanedData;
}

export default deleteHandler;
