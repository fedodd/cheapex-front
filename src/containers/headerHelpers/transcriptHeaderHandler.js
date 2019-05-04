import React from "react";

const transcriptHeaderHandler = (header, headerShort, targetColumns) => {

  
  
  const objectedFullHeader = header.map((elem, index) => {
    let transcriptedClass = "";
    targetColumns.map((transcriptIndex) => index === transcriptIndex ? transcriptedClass = "transcripted" : null);
    return <span className={transcriptedClass} repeatCheckName={elem}>
              {headerShort[index]}
              <span className="header__full">{elem}</span>
            </span>;
  });

  return objectedFullHeader ;
}

export default transcriptHeaderHandler;
