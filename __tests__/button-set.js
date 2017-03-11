import React from 'react';
import ButtonSet from '../src/button-set';
//import {defineSetState} from '../src/state-util';
import {mount} from 'enzyme';
import snapshot from './snapshot';

describe('DataEntry', () => {
  it('should render', () => {
    const buttons = [
      {
        text: 'Save',
        kind: 'primary',
        onClick: () => console.log('saved!'),
      },
      {
        text: 'Info',
        kind: 'info',
        onClick: () => console.log('info!'),
      },
      {
        text: 'Cancel',
        kind: 'danger',
        onClick: () => console.log('cancelled!'),
      },
    ];

    snapshot(<ButtonSet buttons={buttons} />);
  });

  it('should add class = its kind property', () => {
    const buttons = [
      {
        text: 'Text',
        kind: 'success',
        onClick: () => console.log('success!')
      }
    ];
    const wrapper = mount(<ButtonSet buttons={buttons} />);
    const btn = wrapper.find('.btn-success');
    expect(btn.length).toBe(1);
  });

  it('should display the text property as the button label', () => {
    const buttons = [
      {
        text: 'Text',
        kind: 'success',
        onClick: () => console.log('success!')
      }
    ];
    const wrapper = mount(<ButtonSet buttons={buttons} />);
    const btn = wrapper.find('.btn-success');
    expect(btn.text()).toBe('Text');
  });

  it('should call onClick fn when clicked', () => {
    const onClick = jest.fn();
    const buttons = [
      {
        text: 'Text',
        kind: 'success',
        onClick
      }
    ];
    const wrapper = mount(<ButtonSet buttons={buttons} />);
    const btn = wrapper.find('.btn-success');
    btn.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});

