import React from 'react';
import LookupInput from '../src/lookup-input';
import {mount} from 'enzyme';
import snapshot from './snapshot';

describe('LookupInput', () => {
  it('should render', () => {
    snapshot(<LookupInput img="search" />);
  });

  it('should call onChange fn when text is updated with entered text', () => {
    const onChange = jest.fn();
    const wrapper = mount(<LookupInput img="search" onChange={onChange} />);
    const input = wrapper.find('.lookup-input-input');
    input.simulate('change', {target: {value: 'foo'}});
    expect(onChange)
      .toHaveBeenCalledWith(
        expect.objectContaining({target: {value: 'foo'}})
      );
  });

  it('should call onClick fn when the icon is clicked', () => {
    const onClick = jest.fn();
    const wrapper = mount(<LookupInput img="search" onSubmit={onClick} />);
    const icon = wrapper.find('.lookup-input-icon');
    icon.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should call onClick fn when enter key is pressed', () => {
    const onEnterPress = jest.fn();
    const wrapper = mount(<LookupInput img="search" onSubmit={onEnterPress} />);
    const input = wrapper.find('.lookup-input-input');
    input.simulate('keyPress', {which: 13});
    expect(onEnterPress).toHaveBeenCalled();
  });
});

