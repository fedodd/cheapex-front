  const calculateFunc = (columnName, columnIndex, row, data) => {

    if (!isNaN(row[columnIndex])) {
      switch (columnName) {
        case 'price($)':
          data.price.totalPrice = data.price.totalPrice + row[columnIndex];
          break;
        case 'dMin':
          data.days.dMin = data.days.dMin +  row[columnIndex];
          break;
        case 'dMax(connect(…))':
          data.days.dMax = data.days.dMax + row[columnIndex];
          break;
        default:
          break;
      }

    }
    return data;
  }

export default calculateFunc;
