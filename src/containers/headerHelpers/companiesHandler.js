import React from "react";

const companiesHandler = (data) => {
  
  data.map(row => {
    //вторая колонка - это компании
    row[1] = (<a href={'https://' + row[1]} className="company" target="_blank">{row[1]}</a>);
  });
  return data;
}

export default companiesHandler;