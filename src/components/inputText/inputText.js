import React from 'react';

const inputText = (props) => {
  return (
    <label>
      {props.label}
      <input type="text" value={props.value} onChange={props.onChange} />
    </label>
  );
};

export default inputText;
