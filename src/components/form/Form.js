import React, { useState } from 'react';
import axios from "axios";
import Papa from "papaparse";

const form =(props) => {

  const handleChange = (event) => {
    const selectedFile = document.getElementById('input').files[0];
    console.log('change file ', selectedFile);
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
          console.log(results);
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
          console.log(sendData); // result - аргумент resolve
          axios.post('https://react-app-bc4e6.firebaseio.com/importedSheet.json', sendData)
            .then(response => {
              console.log('table sent to database!');
            })
            .catch(error => {
              console.log('error!');
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="file" id="input" onChange={(e) => handleChange(e)}/>
        </label>
        <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)}/>
      </form>
    );
}

export default form;
