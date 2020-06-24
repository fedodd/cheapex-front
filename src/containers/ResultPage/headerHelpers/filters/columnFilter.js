import React, { useState } from 'react';
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
  // need to put here data

  const [daysMin, setDaysMin] = useState(2);
  const [daysMax, setDaysMax] = useState(20);
  const [priceMin, setPriceMin] = useState(400);
  const [priceMax, setPriceMax] = useState(20000);

  const [rangeType, setRangeType] = useState('price');

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
              <RadioButton
                name="rangeType"
                styled="circle"
                // rangeFilter="days"
                onClick={(e) => setRangeType('days')}
              />
              <InputText
                value={daysMin}
                onChange={(e) => setDaysMin(e.target.value)}
              />
              <span>дн ...</span>
              <InputText
                value={daysMax}
                onChange={(e) => setDaysMax(e.target.value)}
              />
              <span>дн</span>
            </fieldset>
            <fieldset className={filterClasses.rangeFilter}>
              <RadioButton
                name="rangeType"
                styled="circle"
                // rangeFilter="price"
                onClick={(e) => setRangeType('price')}
              />
              <InputText
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
              <span>$ ...</span>
              <InputText
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
              <span>$</span>
            </fieldset>
            <div>
              {/* <Slider />
              <Range /> */}
              {rangeType === 'days' ? (
                <RangeFilter min={daysMin} max={daysMax} />
              ) : (
                <RangeFilter min={priceMin} max={priceMax} />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default columnFilter;
