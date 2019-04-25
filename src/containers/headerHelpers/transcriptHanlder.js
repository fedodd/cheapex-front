import React from "react";
const transcriptHandler = (data, targetColumns) => {

  data.map(row => {

    targetColumns.map((transcriptIndex) => {
      row[transcriptIndex - 1] = <span className="transcripted">{row[transcriptIndex - 1]}<span>{row[transcriptIndex]}</span></span>
      return null;
    })
    return null;
  });
  
  return data;
}

export default transcriptHandler;