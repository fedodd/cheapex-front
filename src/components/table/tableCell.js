import React, {useState, useEffect} from 'react';

const tableCell = (props) => {

  const [cell, createCell] = useState(<span></span>);
  //console.log(props.data);


  // useEffect(()=> {
  //   createCell(props.column);

  // })
  const useCraftCell = () => {

    for (let [key, value] of Object.entries(props.data)) {
      switch (key) {
        case 'hint':
          let newCell = cell;
          //console.log(newCell)
          // createCell = cell
          break;

        default:
          break;
      }
    }
  }
  useCraftCell();



  return (
    <div className="transcriptWrapper">
      <span className="with_transcripted">{props.data.hint}</span>{props.data.value}
    </div>
  );
};

export default tableCell;
