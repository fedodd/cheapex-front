import React from "react";

const transcriptHeaderHandler = (header, headerShort, targetColumns) => {
  
  const objectedFullHeader = header.map((elem, index) => {
    let transcriptedClass = "";
    let valueClass = null;
    //console.log(header);
    const alignedColumns = ['№', 'Ответили', 'Сертификат', 'Комиссия', ];
    const lastColumns = ['Дней', 'Цена'];
    //console.log(elem);
    let newElem;
    if (lastColumns.includes(elem)) {
      newElem = {
        value: <div className="with__equally"><span>= </span><span className="is__rightAlign">{elem}</span></div>,
        checkedName: elem
      }
    } else {
      if (alignedColumns.includes(elem)) {
        valueClass = 'is__aligned';
      }
      (targetColumns.includes(index)) ? transcriptedClass = "transcripted" : null;

      let wrapperClassName = valueClass ? 'transcriptWrapper ' + valueClass : 'transcriptWrapper';
      newElem = {
        value: <span className={wrapperClassName}>{headerShort[index]}<span className={transcriptedClass}>{elem}</span></span>,
        checkedName: elem
      }
    }
    return newElem;
  });

  return objectedFullHeader;
}

export default transcriptHeaderHandler;
