import React from "react";

const transcriptHeaderHandler = (header, headerShort, targetColumns) => {


    targetColumns.map((transcriptIndex) => {
      header[transcriptIndex] = <span className="transcripted">{headerShort[transcriptIndex]}<span>{header[transcriptIndex]}</span></span>
    });
    return header;
}

export default transcriptHeaderHandler;
