import React from "react";

const companiesHandler = (data) => {
  //вторая колонка - это компании
  data.map(row => row[1] =(<a href={'https://' + row[1]} className="company" target="_blank">{row[1]}</a>));

  return data;
}

export default companiesHandler;
