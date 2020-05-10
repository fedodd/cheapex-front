import React, {useState, useEffect} from 'react';
import classes from './Table2.pcss';

const tableCell = (props) => {
  //const [cell, createCell] = useState(props.data.value);
  let cell = <span>{props.data.value}</span>;


  // useEffect(()=> {
  //   createCell(props.column);

  // })
  let hint = null;
  let transcript = null;
  let addedValue = [];
  const useCraftCell = () => {
    // console  .log(props.data)

    for (let [key, value] of Object.entries(props.data)) {
      switch (key) {
        case 'link':
          cell = <a
            href={props.data.link}
            className={classes.company}>{props.data.link}</a>
          // createCell = cell
          break;
        case 'add(hours)':
          cell = <span className={classes.is__number}>{props.data['add(hours)']} ч.</span>
          // createCell = cell
          break;
        case 'price($)':
          cell = <span  className={classes.is__number}>{props.data['price($)']} $</span>
          // createCell = cell
          break;
        case 'add(%)':
          cell = <span  className={classes.is__number}>{props.data['add(%)']} %</span>
          break;
        case 'transcript':
          //maybe check on empty cells for all data?
          transcript = props.data.transcript ? <span className={classes.transcript}>{props.data.transcript}</span> : null;
          break;
        case 'connect(arrow)':
          addedValue.push(
            (<React.Fragment key={key}>
              <span className={classes.arrow}></span>
              <span>{props.data['connect(arrow)']}</span>
            </React.Fragment>))
          break;
        case 'image':
          cell = (<span>{props.data.image}</span>)
          break;
        case 'dMin':
          cell = (<span>{props.data.dMin}</span>)
          break;
        case 'dMax(connect(…))':
          addedValue.push(
            <React.Fragment  key={key}>
              <span>...</span>
              <span>{props.data['dMax(connect(…))']}</span>
            </React.Fragment>)
          break;

        case 'hint':
          hint = <span className={classes.hint}>{props.data.hint}</span>;
          break;

        default:
          // console.log(key);

          // cell = (<span>{value}</span>)
          break;
      }
    }
  }
  useCraftCell();



  return (
    <div className={classes.cell}>
      {hint}
      {transcript}
      {cell}
      {addedValue}
    </div>
  );
};

export default tableCell;
