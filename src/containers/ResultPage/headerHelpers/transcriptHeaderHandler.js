import React from "react";

const transcriptHeaderHandler = (header, headerShort, targetColumns) => {
  
  const objectedFullHeader = header.map((elem, index) => {
    let transcriptedClass = "";
    let valueClass = null;
    console.log(header);
    const alignedColumns = ['№', 'Ответили', 'Сертификат', 'Комиссия', ];
    const lastColumns = ['= Дней', '= Цена'];
    //console.log(elem);
    if (alignedColumns.includes(elem)) {
        valueClass = 'is__aligned';
    } else if (lastColumns.includes(elem)) {
      valueClass = 'is__alt__aligned';
    }
    // eslint-disable-next-line no-unused-expressions
    ( targetColumns.includes(index) ) ? transcriptedClass = "transcripted" : null;

    /** newElem;

    if (index >= header.length-2) {
      newElem = {
        value: <span className="transcriptWrapper">{headerShort[index]}<span></<span className={transcriptedClass}>{elem}</span></span>,
        checkedName: elem
      }
    }

     */
    let wrapperClassName = valueClass ? 'transcriptWrapper ' + valueClass : 'transcriptWrapper';
    let newElem = {
      value: <span className={wrapperClassName}>{headerShort[index]}<span className={transcriptedClass}>{elem}</span></span>,
      checkedName: elem
    }

    return newElem;
  });

  return objectedFullHeader;
}

export default transcriptHeaderHandler;
