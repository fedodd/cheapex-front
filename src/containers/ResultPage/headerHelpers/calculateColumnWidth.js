 const calculateColumnWidth = (data, columns) => {
   Object.keys(columns).map(columnGroup => {

     columns[columnGroup].columns.map(column => {

       const width = column.cellIndexes.reduce((acc, pair) => {
         if (pair[1] !== 'hint' && pair[1] !== 'transcript') {
           const biggestLength = data.reduce((cellLength, row) => {
             let newLength = String(row[pair[0]]).length;
             return cellLength <= newLength ? newLength : cellLength;
           }, 0)
           return acc + biggestLength;
         }
         return acc;

       }, 0);

      const magicSpacing =11;
      column.width = width*magicSpacing;
     })
   })

   return columns
  }

 export default calculateColumnWidth;
