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
  const dispatch = useDispatch();

  const [daysIsActive, setDaysIsActive] = useState(true);

  const days = useSelector((state) => state.filters.days, shallowEqual);
  const price = useSelector((state) => state.filters.price, shallowEqual);

  // need to usecallback here, and after that i think i can concat this to range change fuctions
  const onRangeDaysChange = (values) => {
    // console.log("values days:", daysIsActive, values === days);

    dispatch(setFilterDays(values), shallowEqual);
  };

  const onRangePriceChange = (values) => {
    // console.log("values days:", daysIsActive, values === days);

    dispatch(setFilterPrice(values), shallowEqual);
  };

  const onInputChange = useCallback(
    (value, type) => {
      switch (type) {
        case "dmin":
          dispatch(setFilterDays(value), shallowEqual);
          break;
        case "dmax":
          dispatch(setFilterDays(value), shallowEqual);

          break;
        case "pmin":
          dispatch(setFilterPrice(value), shallowEqual);
          break;
        case "pmax":
          dispatch(setFilterPrice(value), shallowEqual);
          break;

        default:
          break;
      }
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
                limits={limits.days}
                type="min"
                values={days}
                name="daysMin"
                disabled={!daysIsActive}
                onChange={(value) => onInputChange(value, "dmin")}
              />
              <span>дн ...</span>
              <InputText
                limits={limits.days}
                type="max"
                values={days}
                disabled={!daysIsActive}
                onChange={(value) => onInputChange(value, "dmax")}
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
                limits={limits.price}
                type="min"
                values={price}
                disabled={daysIsActive}
                onChange={(value) => onInputChange(value, "pmin")}
              />
              <span>$ ...</span>
              <InputText
                limits={limits.price}
                type="max"
                values={price}
                disabled={daysIsActive}
                onChange={(value) => onInputChange(value, "pmax")}
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
                  values={days}
                  disabled={!daysIsActive}
                  onChangeHandler={(values) => onRangeDaysChange(values)}
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
                  values={price}
                  onChangeHandler={(values) => onRangePriceChange(values)}
                  disabled={daysIsActive}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default columnFilter;
