import React, {useState, useEffect} from 'react';

const tableCell = (props) => {

  const [cell, createCell] = useState(null);

  useEffect(()=> {
    createCell(props.column);
  })

  return (
    <div>
      <p>{cell}</p>
    </div>
  );
};

export default tableCell;
