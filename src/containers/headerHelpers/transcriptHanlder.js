import React from "react";
const transcriptHandler = (data, targetColumns) => {

  data.map(row => {
    targetColumns.map((transcriptIndex) => {
      if (row[transcriptIndex] !== null) {
        row[transcriptIndex - 1] = <span className="transcriptWrapper">{row[transcriptIndex - 1]}<span className="transcripted">{row[transcriptIndex]}</span></span>
        return null;
      }
    })
    return null;
  });
  
  return data;
}

export default transcriptHandler;