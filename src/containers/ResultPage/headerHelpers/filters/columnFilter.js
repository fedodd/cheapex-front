import React, { useState, useEffect, useCallback } from "react";
import Slider, { Range } from "rc-slider";

import { shallowEqual, useSelector, useDispatch } from "react-redux";

import {
  setFilter,
  setEndPoints,
  setFilterDays,
  setFilterPrice,
} from "../../../../redux/actions";

import "rc-slider/assets/index.css";
import RangeFilter from "./rangeFilter";

import filterClasses from "./filters.pcss";
import tableClasses from "../../../../components/table/Table.pcss";
import Checkbox from "../../../../components/checkbox/checkbox";
import RadioButton from "../../../../components/radioButton/radioButton";
import InputText from "../../../../components/inputText/inputText";

const columnFilter = () => {
  // need to put here data
  const limits = useSelector((state) => state.table.limits, shallowEqual);
  const endPoints = useSelector(
    (state) => state.filters.endPoints,
    shallowEqual
  );
  const dispatch = useDispatch();

  const days = useSelector((state) => state.filters.days, shallowEqual);
  const price = useSelector((state) => state.filters.price, shallowEqual);

  const [daysIsActive, setDaysIsActive] = useState(true);

  useEffect(() => {
    console.log(limits, endPoints);
    dispatch(setFilterDays(days), shallowEqual);
    dispatch(setFilterPrice(price), shallowEqual);
    // dispatch(setEndPoints(limits), shallowEqual);
  }, []);

  useEffect(() => {
    dispatch(setFilterDays(days), shallowEqual);
  }, [days]);

  useEffect(() => {
    dispatch(setFilterPrice(price), shallowEqual);
  }, [price]);

  // onInputChange = (value) => {
  //   dispatch(setFilterDays(days.min), shallowEqual);
  // }
  const onInputChange = useCallback(
    (value, type) => {
      // type === min ?
      console.log("in callback onInputChange", value, type);

      // return dispatch(setFilterDays(days), shallowEqual);
    },
    [dispatch]
  );

  const onRangeChange = useCallback(
    (value, type) => {
      // type === min ?
      console.log("in callback onRangeChange", value);

      // return dispatch(setFilterDays(days), shallowEqual);
    },
    [dispatch]
  );

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
                limit={{ type: "min", values: limits.days }}
                values={[days.min, days.max]}
                name="daysMin"
                disabled={!daysIsActive}
                onChange={(value) => onInputChange(value, "Dmin")}
              />
              <span>дн ...</span>
              <InputText
                limit={{ type: "max", values: limits.days }}
                values={[days.min, days.max]}
                disabled={!daysIsActive}
                onChange={(value) => onInputChange(value, "Dmax")}
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
                limit={{ type: "min", values: limits.price }}
                values={[price.min, price.max]}
                disabled={daysIsActive}
                onChange={(value) => onInputChange(value, "Pmin")}
              />
              <span>$ ...</span>
              <InputText
                limit={{ type: "max", values: limits.price }}
                values={[price.min, price.max]}
                disabled={daysIsActive}
                onChange={(value) => onInputChange(value, "Pmax")}
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
                  min={limits.days.min}
                  max={limits.days.max}
                  values={[days.min, days.max]}
                  disabled={!daysIsActive}
                  onChangeHandler={(values) => onRangeChange(values)}
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
                  min={limits.price.min}
                  max={limits.price.max}
                  values={[price.min, price.max]}
                  onChangeHandler={(values) => onRangeChange(values)}
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
