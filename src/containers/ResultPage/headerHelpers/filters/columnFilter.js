import React, { useState, useEffect } from "react";
import Slider, { Range } from "rc-slider";

import { shallowEqual, useSelector, useDispatch } from "react-redux";

import "rc-slider/assets/index.css";
import RangeFilter from "./rangeFilter";

import filterClasses from "./filters.pcss";
import tableClasses from "../../../../components/table/Table.pcss";
import Checkbox from "../../../../components/checkbox/checkbox";
import RadioButton from "../../../../components/radioButton/radioButton";
import InputText from "../../../../components/inputText/inputText";

const columnFilter = () => {
  // need to put here data
  const endPoints = useSelector((state) => state.table.endPoints, shallowEqual);
  // const dispatch = useDispatch();
  // console.log("endPOintsFormStore", endPOintsFormStore);

  // const endPoints = {
  //   days: {
  //     min: 1,
  //     max: 20,
  //   },
  //   price: {
  //     min: 100,
  //     max: 20000,
  //   },
  // };

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

  return (
    <div className={tableClasses.columnFilter + " " + tableClasses.is__big}>
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
                limit={{ type: "min", values: endPoints.days }}
                values={days}
                name="daysMin"
                disabled={!daysIsActive}
                onChange={(value) => setDays([value, days[1]])}
              />
              <span>дн ...</span>
              <InputText
                limit={{ type: "max", values: endPoints.days }}
                values={days}
                disabled={!daysIsActive}
                onChange={(value) => setDays([days[0], value])}
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
                limit={{ type: "min", values: endPoints.price }}
                values={price}
                disabled={daysIsActive}
                onChange={(value) => setPrice([value, price[1]])}
              />
              <span>$ ...</span>
              <InputText
                limit={{ type: "max", values: endPoints.price }}
                values={price}
                disabled={daysIsActive}
                onChange={(value) => setPrice([price[0], value])}
              />
              <span>$</span>
            </fieldset>
            <div>
              <div
                className={
                  daysIsActive
                    ? filterClasses.trackWrapper +
                      " " +
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
                      " " +
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
