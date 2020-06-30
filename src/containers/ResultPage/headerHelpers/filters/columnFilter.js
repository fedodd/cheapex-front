import React, { useState, useEffect } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeFilter from './rangeFilter';

import filterClasses from './filters.pcss';
import tableClasses from '../../../../components/table/Table.pcss';
import Checkbox from '../../../../components/checkbox/checkbox';
import RadioButton from '../../../../components/radioButton/radioButton';
import InputText from '../../../../components/inputText/inputText';
// import InputText from '../../../../components/inputText/inputText';
// import
const columnFilter = () => {
  // need to put here data

  const endPoints = {
    days: {
      min: 1,
      max: 20,
    },
    price: {
      min: 100,
      max: 20000,
    },
  };

  // const [daysMin, setDaysMin] = useState(4);
  // const [daysMax, setDaysMax] = useState(14);
  // const [priceMin, setPriceMin] = useState(879);
  // const [priceMax, setPriceMax] = useState(12845);

  const [days, setDays] = useState([endPoints.days.min, endPoints.days.max]);
  const [price, setPrice] = useState([
    endPoints.price.min,
    endPoints.price.max,
  ]);

  const [daysIsActive, setDaysIsActive] = useState(true);

  // const onInputChange = (e, callback) => {
  //   console.log('in input', e.target.value, callback);

  //   const value = +e.target.value;
  //   // if (daysIsActive) {
  //   //   if (value < endPoints.days.min) {
  //   //     setTimeout(() => {
  //   //       console.log('days min');

  //   //       callback(endPoints.days.min)
  //   //     }, 1000);
  //   //   } else if (value > endPoints.days.max) {
  //   //     setTimeout(() => {
  //   //       console.log('days max');
  //   //       callback(endPoints.days.max)
  //   //     }, 1000);
  //   //   }
  //   // } else {
  //   //   if (value < endPoints.price.min) {
  //   //     setTimeout(() => {
  //   //       console.log('price min');
  //   //       callback(endPoints.price.min)
  //   //     }, 1000);
  //   //   } else if (value > endPoints.price.max) {
  //   //     setTimeout(() => {
  //   //       console.log('price max');
  //   //       callback(endPoints.price.max)
  //   //     }, 1000);
  //   //   }
  //   }

  // const onInputHandler =(e, endPoint)=> {
  //   const value = +e.target.value;
  //   let newValue = value;
  //   let type = daysIsActive ? 'days' : 'price';
  //   console.log('in handler', value, endPoint, type);

  //   if (endPoint === 'min' ) {

  //     if (value < endPoint.min ) {
  //       newValue = endPoint[type].min;
  //     } else if (value > endPoint[type].max) {
  //       newValue = endPoint[type].max
  //     }


  //   } else {
  //     if (value > endPoint[type].max ) {
  //       newValue = endPoint[type].max;
  //     } else if (value < endPoint[type].min) {
  //       newValue = endPoint[type].min
  //     }
  //   }

  //   setTimeout(() => {
  //       console.log('in time out', value, newValue);
  //       // value === newValue  ? null : setValue(newValue);
  //       if (daysIsActive) {
  //         setDays
  //       }
  //       props.onChange(newValue);
  //   }, 500);
  // }

  //   callback(value)
  //   // setDays([e.target.value, days[1]]);
  //   // setDays(+e.target.value);
  //   console.log(days);
  // };

  return (
    <div className={tableClasses.columnFilter + ' ' + tableClasses.is__big}>
      <div className="sort">
        <button className={filterClasses.button}>&#8593; По возрастанию</button>
        <button className={filterClasses.button}>&#8595; По убыванию</button>
      </div>
      <div className="filter">
        <div className="">
          <form>
            <fieldset className={filterClasses.rangeValues}>
              <RadioButton
                name="rangeType"
                styled="circle"
                isChecked={daysIsActive}
                onClickHandler={(e) => setDaysIsActive(true)}
              />
              <InputText
                limit={{type: 'min', values: endPoints.days}}
                values={days}
                name="daysMin"
                disabled={!daysIsActive}
                onChange={(value) => setDays([value, days[1]])}
              />
              <span>дн ...</span>
              <InputText
                limit={{type: 'max', values: endPoints.days}}
                values={days}
                disabled={!daysIsActive}
                onChange={(value) => setDays([days[0], value]) }
              />
              <span>дн</span>
            </fieldset>
            <fieldset className={filterClasses.rangeValues}>
              <RadioButton
                isChecked={!daysIsActive}
                name="rangeType"
                styled="circle"
                // rangeFilter="price"
                onClickHandler={(e) => setDaysIsActive(false)}
              />
              <InputText
                limit={{type: 'min', values:  endPoints.price}}
                values={price}
                disabled={daysIsActive}
                onChange={(value) => setPrice([value, price[1]]) }
              />
              <span>$ ...</span>
              <InputText
                limit={{type: 'max', values: endPoints.price}}
                values={price}
                disabled={daysIsActive}
                onChange={(value) => setPrice([price[0], value]) }
              />
              <span>$</span>
            </fieldset>
            <div>
              <div
                className={
                  daysIsActive
                    ? filterClasses.trackWrapper +
                      ' ' +
                      filterClasses.is__active
                    : filterClasses.trackWrapper
                }>
                <RangeFilter
                  min={endPoints.days.min}
                  max={endPoints.days.max}
                  values={days}
                  disabled={!daysIsActive}
                  onChangeHandler={(values) => setDays(values)}
                />
              </div>
              <div
                className={
                  !daysIsActive
                    ? filterClasses.trackWrapper +
                      ' ' +
                      filterClasses.is__active
                    : filterClasses.trackWrapper
                }>
                <RangeFilter
                  min={endPoints.price.min}
                  max={endPoints.price.max}
                  values={price}
                  onChangeHandler={(values) => setPrice(values)}
                  disabled={daysIsActive}
                />
              </div>
            </div>

            {/* <div
              className={
                rangeType === 'days'
                  ? filterClasses.trackWrapper + ' is__active'
                  : filterClasses.trackWrapper
              }>
              <RangeFilter min={daysMin} max={daysMax} disabled />
            </div>
            <div
              className={
                rangeType === 'price'
                  ? filterClasses.trackWrapper + ' is__active'
                  : filterClasses.trackWrapper
              }>
              <RangeFilter min={priceMin} max={priceMax} />
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default columnFilter;
