import React, {useState, useEffect} from 'react';
import classes from './Table2.pcss';

const tableCell = (props) => {

  //const [cell, createCell] = useState(props.data.value);
  let cell = <span>{props.data.value}</span>;
  const hint = props.data.hint ? <span className={classes.hint + ' ' + classes.transcript}>{props.data.hint}</span> : null;


  // useEffect(()=> {
  //   createCell(props.column);

  // })
  let transcript = null;
  let addedValue = [];
  const useCraftCell = () => {

    for (let [key, value] of Object.entries(props.data)) {
      switch (key) {
        case 'link':
          cell = <a href={props.data.link}>{props.data.link}</a>
          // createCell = cell
          break;
        case 'add(hours)':
          cell = <span>{props.data['add(hours)']}ч.</span>
          // createCell = cell
          break;
        case 'price($)':
          cell = <span>{props.data['price($)']}$</span>
          // createCell = cell
          break;
        case 'add(%)':
          cell = <span>{props.data['add(%)']}%</span>
          // createCell = cell
          break;
        case 'transcript':
          //console.log(cell.props.children);
          transcript = <span className={classes.transcript}>{props.data.transcript}</span>;
          //cell.props.children.add(<span className="with_transcripted">{props.data.transcript}</span>)

          // createCell = cell
          break;
        case 'connect(arrow)':
          addedValue.push(
            (<React.Fragment>
              <span>→</span>
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
            <React.Fragment>
              <span>...</span>
              <span>{props.data['dMax(connect(…))']}</span>
            </React.Fragment>)
          break;

        case 'hint':
          let newCell = cell;
          // createCell = cell
          break;

        default:
          break;
      }
    }
  }
  useCraftCell();



  return (
    <div className={classes.transcriptWrapper}>
      {hint}
      {transcript}
      {cell}
      {addedValue}
    </div>
  );
};

export default tableCell;
