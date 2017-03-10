import React, {PropTypes as t} from 'react';

const DataInput = ({autoFocus, label, name, onChange, onKeyPress, value}) => (
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

DataInput.propTypes = {
  autoFocus: t.bool,
  label: t.string.isRequired,
  name: t.string,
  onChange: t.func,
  onKeyPress: t.func,
  value: t.string.isRequired,
};

export default DataInput;
