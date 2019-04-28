import React, { Component } from 'react';
import axios from "axios";
import Papa from "papaparse";
import withClass from '../../hoc/WithClass';
import classes from './Form.pcss';

class Form extends Component {


  handleChange = (event) => {
    const selectedFile = document.getElementById('input').files[0];
    console.log(selectedFile);
    // добавить проверку на формат csv
  }

  handleSubmit = (event) => {
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

  render () {
    return (
      <React.Fragment>
        <h2>Загрузите исходные данные</h2>
        <form onSubmit={this.handleSubmit} style={{}}>
          <label>
            Данные:
                <input type="file" id="input" onChange={(e) => this.handleChange(e)} accept=".csv"/>
          </label>
          <input type="submit" value="Submit" onClick={(e) => this.handleSubmit(e)} />
        </form>
      </React.Fragment>
    );
  }
 
}

export default withClass(Form, classes.FormBlock);
