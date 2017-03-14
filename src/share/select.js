// @flow
import React, {PropTypes as t} from 'react';
import './select.css';

type OptionType = {
  text: string,
  value: string
};

type OptionsType = Array<OptionType>;

const Option = (option: OptionType) => (
  <option key={option.value} value={option.value}>
    {option.text}
  </option>
);

type PropsType = {
  disabled: boolean,
  label: string,
  multiple: boolean,
  onChange: Function,
  options: OptionsType,
  size: number,
  value: string
};

export default function Select(
  {
    disabled,
    label,
    multiple,
    onChange,
    options,
    size,
    value,
  }: PropsType,
) {
  return (
    <div className="select">
      {label ? <label>{label}</label> : null}
      <select
        className="form-control"
        onChange={onChange}
        size={size}
        value={value}
        disabled={disabled}
        multiple={multiple}
      >
        {options.map(Option)}
      </select>
    </div>
  );
}

Select.propTypes = {
  disabled: t.bool,
  label: t.string,
  multiple: t.bool,
  onChange: t.func.isRequired,
  options: t.arrayOf(t.shape({text: t.string, value: t.string})).isRequired,
  size: t.number,
  value: t.string.isRequired,
};
