import React from 'react';
import {mount} from 'enzyme';

import Select from '../src/select';
import snapshot from './snapshot';

describe('Select', () => {
  const onChange = jest.fn();
  const options = [
    {text: 'A', value: 'a'},
    {text: 'B', value: 'b'},
    {text: 'C', value: 'c'}
  ];
  const size = 5;
  const value = 'hello';
  const props = {onChange, options, size, value};

  it('should render', () => {
    snapshot(<Select {...props} />);
  });

  it('should call onChange when the select changes', () => {
    const wrapper = mount(<Select {...props} />);
    wrapper.find('select').simulate('change', {target: {value: 'world'}});
    expect(onChange).toHaveBeenCalled();
  });
});
