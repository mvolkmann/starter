import React, {PropTypes as t} from 'react';
import './data-input.css';

const DataInput = (
  {autoFocus, className = '', label, name, onChange, onKeyPress, value},
) => (
  <div className="data-input">
    <label>{label}</label>
    <input
      autoFocus={autoFocus}
      className={`form-control ${className}`}
      name={name}
      onChange={onChange}
      onKeyPress={onKeyPress}
      type="text"
      value={value}
    />
  </div>
);

DataInput.propTypes = {
  autoFocus: t.bool,
  className: t.string,
  label: t.string.isRequired,
  name: t.string,
  onChange: t.func,
  onKeyPress: t.func,
  value: t.string.isRequired,
};

export default DataInput;
