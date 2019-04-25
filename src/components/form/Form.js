import React from 'react';
import axios from "axios";
import Papa from "papaparse";
import withClass from '../../hoc/withClass';
import classes from './Form.pcss';

const form =(props) => {

  const handleChange = (event) => {
    const selectedFile = document.getElementById('input').files[0];
    // добавить проверку на формат csv
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('input').files[0];
    let sendData = {};

    let promise = new Promise((resolve, reject) => {
      Papa.parse(fileInput, {
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
          resolve(results);
        }
      })
    });

    // promise.then навешивает обработчики на успешный результат или ошибку
    promise
      .then(
        result => {
          // первая функция-обработчик - запустится при вызове resolve
          sendData = result;
          axios.post('https://react-app-bc4e6.firebaseio.com/importedSheet.json', sendData)
            .then(response => {
              console.log('table sent to database!');
              alert('table sent to database!');
            })
            .catch(error => {
              console.log('error!');
              alert('error!');
              // здесь надо прописать сценарии по ошибкам. а где-тоо выше - ловить ошибки - например файл не в том формате или типа того
            });
        },
        error => {
          // вторая функция - запустится при вызове reject
          alert("Rejected: " + error); // error - аргумент reject
        }
      );
    event.preventDefault();
  }

    return (
      <withClass>
        <h2>Загрузите исходные данные</h2>
        <form onSubmit={this.handleSubmit} style={{}}>
          <label>
            Данные:
          <input type="file" id="input" onChange={(e) => handleChange(e)} />
          </label>
          <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)} />
        </form>
      </withClass>
    );
}

export default withClass(form, classes.FormBlock);
