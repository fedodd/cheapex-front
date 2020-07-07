import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import classes from "./filters.pcss";

function companyTypeFilter(props) {
  return (
    <ul className={classes.columnFilter}>
      <Checkbox label="Экспедиторы" />
      <Checkbox label="Перевозчики" />
      <Checkbox label="Сервис" />
    </ul>
  );
}

export default companyTypeFilter;
