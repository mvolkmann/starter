import React, {PropTypes as t} from 'react'

const DataInput = ({autoFocus, label, name, onChange, onKeyPress, value}) => (
  <div className="data-input">
    <label>{label}</label>
    <input
      autoFocus={autoFocus}
      className="form-control"
      name={name}
      onChange={onChange}
      onKeyPress={onKeyPress}
      type="text"
      value={value}
    />
  </div>
)

DataInput.propTypes = {
  autoFocus: t.bool,
  label: t.string.isRequired,
  name: t.string,
  onChange: t.func,
  onKeyPress: t.func,
  value: t.string.isRequired,
}

export default DataInput
