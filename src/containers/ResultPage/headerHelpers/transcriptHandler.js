import React from "react";
const transcriptHandler = (data, transcriptColumns, transcriptColumns_alt) => {

  data.map(row => {
    transcriptColumns.map((transcriptIndex) => {
      if (row[transcriptIndex] !== null) {

        row[transcriptIndex - 1] = <span className="transcriptWrapper"><span className="transcripted">{row[transcriptIndex]}</span>{row[transcriptIndex - 1]}</span>
        return null;
        //если расшифровки нет, все равно вешаем класс, т.к. мы чекаем размер колонки по названию класса колонки
      } else {
        row[transcriptIndex - 1] = <span className="transcriptWrapper">{row[transcriptIndex - 1]}</span>
        return null;
      }
    })
    transcriptColumns_alt.map((transcriptIndex) => {
      if (row[transcriptIndex] !== null) {

        row[transcriptIndex - 1] = <span className="transcriptWrapper is__alt"><span className="transcripted is__alt">{row[transcriptIndex]}</span>{row[transcriptIndex - 1]}</span>
        return null;
        //если расшифровки нет, все равно вешаем класс, т.к. мы чекаем размер колонки по названию класса колонки
      } else {
        row[transcriptIndex - 1] = <span className="transcriptWrapper">{row[transcriptIndex - 1]}</span>
        return null;
      }
    })
    return null;
  });

  return data;
}

export default transcriptHandler;
