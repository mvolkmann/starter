// @flow

import React, {PropTypes as t} from 'react';

type OptionType = {
  text: string,
  value: string
};

type OptionsType = Array<OptionType>;

const Option = (option: OptionType, index: number) => (
  <option
    key={option.value}
    value={option.value}
  >
    {option.text}
  </option>
);

type SelectPropsType = {
  onChange: Function,
  options: OptionsType,
  size: number,
  value: string
};

export default function Select({
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
    >
      {options.map(Option)}
    </select>
  );
}

Select.propTypes = {
  onChange: t.func.isRequired,
  options: t.arrayOf(t.shape({text: t.string, value: t.string})).isRequired,
  size: t.number,
  value: t.string.isRequired,
};
