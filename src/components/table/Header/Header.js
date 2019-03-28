import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

const Header = (props) => {

  const headerValue = [
    ['Веб-сайт', 'Веб-сайт'],
    ['Ответили', 'Отв.'],
    ['Офис', 'Оф.'],
    ['Перевозка по Китаю', 'Пер. по КНР'],
    ['Перевозка по Китаю', 'Пер. по КНР'],
    ['Перевозка по Китаю', 'Пер. по КНР'],
    ['Перевозка по Китаю', 'Пер. по КНР'],
    ['Перевозка по Китаю', 'Пер. по КНР'],
    ['Перевозка по Китаю', 'Пер. по КНР'],
    ['Перевозка по Китаю', 'Пер. по КНР'],
    ['Перевозка по Китаю', 'Пер. по КНР'],
    ['Переупаковка', 'Пер.'],
    ['Переупаковка', 'Пер.'],
    ['Переупаковка', 'Пер.'],
    ['Переупаковка', 'Пер.'],
    ['=дней', '=дн'],
    ['=цена', '=цена'],
  ]

  const maкеСolumns = (headerValue) => {
    headerValue.map(column => {
      return {Header: column[1]}
    })
  }

  return (
    <div>
      <ReactTable
        columns={[
            {
            Header: headerValue[0][1],
              accessor: "firstName"
            },
            {
              Header: headerValue[1][1],
              id: "lastName",
              accessor: d => d.lastName
            }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
};

export default Header;
