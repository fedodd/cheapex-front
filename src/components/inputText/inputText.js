import React from 'react';

const inputText = (props) => {
  return (
    <label>
      {props.label}
      <input type="text" dafaultValue={props.value ? props.value : null} />
    </label>
  );
};

export default inputText;
