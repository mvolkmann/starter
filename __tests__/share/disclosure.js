import React from 'react';
import Disclosure from '../../src/share/disclosure';
import {mount} from 'enzyme';
import snapshot from '../snapshot';

describe('Disclosure', () => {
  const tree = {
    parent: 'Controlled Environments',
    children: [
      {
        id: 'CH',
        parent: 'Chesterfield',
        children: [
          {
            id: 'CH-CC',
            parent: 'CC',
            children: ['R1', 'R2']
          },
          {
            id: 'CH-DD',
            parent: 'DD',
            children: ['R3', 'R4', 'R5']
          },
          {
            id: 'CH-GG',
            parent: 'GG',
            children: ['R6']
          }
        ]
      },
      {
        id: 'CC',
        parent: 'Creve Coeur',
        children: [
          {
            id: 'CC-C',
            parent: 'C',
            children: ['R7', 'R8']
          }
        ]
      }
    ]
  };

  it('should render', () => {
    snapshot(<Disclosure tree={tree} />);
  });

  it('should handle toggle all', () => {
    const wrapper = mount(<Disclosure tree={tree} />);

    const toggleAllBtn = wrapper.find('.toggleAll');
    toggleAllBtn.simulate('click');

    const toggleBtn = wrapper.find('.disclosure-triangle').first();
    toggleBtn.simulate('click');

    wrapper.setProps({allOpen: true});
  });
});
