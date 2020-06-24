import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeFilter from './rangeFilter';

import filterClasses from './filters.css';
import tableClasses from '../../../../components/table/Table.pcss';
import Checkbox from '../../../../components/checkbox/checkbox';
import RadioButton from '../../../../components/radioButton/radioButton';
import InputText from '../../../../components/inputText/inputText';
// import InputText from '../../../../components/inputText/inputText';
// import
const columnFilter = () => {
  return (
    <div className={tableClasses.columnFilter + ' ' + tableClasses.is__big}>
      <div className="sort">
        <button className={filterClasses.button}>&#8593; По возрастанию</button>
        <button className={filterClasses.button}>&#8595; По убыванию</button>
      </div>
      <div className="filter">
        <div className="">
          <form>
            <fieldset className={filterClasses.rangeFilter}>
              <RadioButton name="rangeType" styled="circle" />
              <InputText defaultValue="8" />
              <span>дн ...</span>
              <InputText defaultValue="12" />
              <span>дн</span>
            </fieldset>
            <fieldset className={filterClasses.rangeFilter}>
              <RadioButton name="rangeType" styled="circle" />
              <InputText defaultValue="435" />
              <span>$ ...</span>
              <InputText defaultValue="17433" />
              <span>$</span>
            </fieldset>
            <div>
              {/* <Slider />
              <Range /> */}
              <RangeFilter min={0} max={100} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default columnFilter;
