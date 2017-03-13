// @flow

import React, {PropTypes as t} from 'react';

type OptionType = {
  text: string,
  value: string
};

type OptionsType = Array<OptionType>;

const Option = (option: OptionType) => (
  <option
    key={option.value}
    value={option.value}
  >
    {option.text}
  </option>
);

type SelectPropsType = {
  disabled: boolean,
  multiple: boolean,
  onChange: Function,
  options: OptionsType,
  size: number,
  value: string
};

export default function Select({
  disabled,
  multiple,
  onChange,
  options,
  size,
  value
}: SelectPropsType) {
  return (
    <select
      className="select"
      onChange={onChange}
      size={size}
      value={value}
      disabled={disabled}
      multiple={multiple}
    >
      {options.map(Option)}
    </select>
  );
}

Select.propTypes = {
  disabled: t.bool,
  multiple: t.bool,
  onChange: t.func.isRequired,
  options: t.arrayOf(t.shape({text: t.string, value: t.string})).isRequired,
  size: t.number,
  value: t.string.isRequired,
};
