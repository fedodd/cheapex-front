import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import CustomizedRange from './rangeFilter';

import filterClasses from './filters.css';
import tableClasses from '../../../../components/table/Table.pcss';
import Checkbox from '../../../../components/checkbox/checkbox';
import InputText from '../../../../components/inputText/inputText';
// import InputText from '../../../../components/inputText/inputText';
// import
const columnFilter = () => {
  return (
    <div className={tableClasses.columnFilter}>
      <div className="sort">
        <button>По возрастанию</button>
        <button>По убыванию</button>
      </div>
      <div className="filter">
        <div className="">
          <form>
            <fieldset>
              <Checkbox styled="circle" />
              <InputText defaultValue="8" />
              <span>дн ...</span>
              <InputText defaultValue="12" />
              <span>дн</span>
            </fieldset>
            <fieldset>
              <Checkbox styled="circle" />
              <InputText defaultValue="435" />
              <span>$ ...</span>
              <InputText defaultValue="17433" />
              <span>$ ...</span>
            </fieldset>
            <div>
              {/* <Slider />
              <Range /> */}
              <CustomizedRange />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default columnFilter;
