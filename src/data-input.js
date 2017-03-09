import React, {PropTypes as t} from 'react';

const DataInput = ({autoFocus, name, onChange, onKeyPress, value, label}) => (
  <span>
    <label>{label}</label>
    <input
      autoFocus={autoFocus}
      name={name}
      onChange={onChange}
      onKeyPress={onKeyPress}
      type="text"
      value={value}
    />
  </span>
);

export default DataInput;

DataInput.propTypes = {
  autoFocus: t.bool,
  label: t.string.isRequired,
  name: t.string,
  onChange: t.func,
  onKeyPress: t.func,
  value: t.string.isRequired,
};
