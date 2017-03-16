// @flow
import React, {PropTypes as t} from 'react';
import './select.css';

type OptionObjectType = {
  text: string,
  value: string
};

type OptionType = string | OptionObjectType;

type OptionsType = Array<OptionType>;

type PropsType = {
  disabled?: boolean,
  label?: string,
  multiple?: boolean,
  onChange: Function,
  options: OptionsType,
  size?: number,
  value: string
};

const Option = (option: OptionType) => {
  const isString = typeof option === 'string';
  // $FlowFixMe
  const value = isString ? option : option.value;
  // $FlowFixMe
  const text = isString ? option : option.text;
  return (
    <option key={value} value={value}>
      {text}
    </option>
  );
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
        disabled={disabled || false}
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
  options: t.arrayOf(
    t.oneOfType([t.string, t.shape({text: t.string, value: t.string})])
  ).isRequired,
  size: t.number,
  value: t.string.isRequired,
};
