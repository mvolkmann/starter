import React from 'react';
import {mount} from 'enzyme';

import Component from '../src/select';
import snapshot from './snapshot';

describe(Component.name, () => {
  const onChange = jest.fn();
  const options = [
    {text: 'A', value: 'a'},
    {text: 'B', value: 'b'},
    {text: 'C', value: 'c'}
  ];
  const size = 5;
  const value = 'hello';
  const getDefaultProps = () => ({onChange, options, size, value});

  it('should render', () => {
    snapshot(<Component {...getDefaultProps()} />);
  });

  it('should have a className of .select on the select element', () => {
    const wrapper = mount(<Component {...getDefaultProps()} />);
    expect(wrapper.find('select.select').length).toEqual(1);
    expect(wrapper.find('.select').length).toEqual(1);
  });

  it('should set the select list value via props.value', () => {
    const wrapper = mount(<Component {...getDefaultProps()} />);
    expect(wrapper.find('select').props().value).toEqual(value);
  });

  it('should set the select list size via props.size', () => {
    const wrapper = mount(<Component {...getDefaultProps()} />);
    expect(wrapper.find('select').props().size).toEqual(size);
  });

  it('should call onChange when the select changes', () => {
    const wrapper = mount(<Component {...getDefaultProps()} />);
    wrapper.find('select').simulate('change', {target: {value: 'world'}});
    expect(onChange).toHaveBeenCalled();
  });

  it('should render the supplied options', () => {
    const wrapper = mount(<Component {...getDefaultProps()} />);
    const selectOptions = wrapper.find('option');

    expect(selectOptions.length).toEqual(options.length);
    for (let i = 0; i < options.length; i++) {
      const selectOption = selectOptions.at(i);
      expect(selectOption.text()).toEqual(options[i].text);
      expect(selectOption.props().value).toEqual(options[i].value);
    }
  });
});
