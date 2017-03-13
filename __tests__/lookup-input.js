import React from 'react'
import LookupInput from '../src/lookup-input'
import {mount} from 'enzyme'
import snapshot from './snapshot'

describe('LookupInput', () => {
  it('should render', () => {
    snapshot(<LookupInput img="search" />)
  })

  it('should call onChange fn when text is updated with entered text', () => {
    const onChange = jest.fn()
    const wrapper = mount(<LookupInput img="search" onChange={onChange} />)
    const input = wrapper.find('.lookup-input-input')
    input.simulate('change', {target: {value: 'foo'}})
    expect(onChange).toHaveBeenCalled()
    expect(onChange)
      .toHaveBeenCalledWith(
        expect.objectContaining(
          {target: expect.objectContaining(
            {value: expect.stringMatching(/foo/)}
          )}
        )
      )
  })

  it('should call onClick fn when the icon is clicked', () => {
    const onClick = jest.fn()
    const wrapper = mount(<LookupInput img="search" onClick={onClick} />)
    const icon = wrapper.find('.lookup-input-icon')
    icon.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should call onKeyPress fn when any key is entered', () => {
    const onKeyPress = jest.fn()
    const wrapper = mount(<LookupInput img="search" onKeyPress={onKeyPress} />)
    const icon = wrapper.find('.lookup-input-input')
    icon.simulate('keypress')
    expect(onKeyPress).toHaveBeenCalled()
  })
})

