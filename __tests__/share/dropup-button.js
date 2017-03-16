import React from 'react';
import DropupBtn from '../../src/share/dropup-button';
import {mount} from 'enzyme';
import snapshot from '../snapshot';

describe('DropupBtn', () => {
  let props;
  beforeEach(() => {
    props = {
      btn: {
        disabled: false,
        kind: 'danger',
        btnText: 'link1'
      },
      links: [
        {
          onClick: () => console.log('clicked1'),
          separator: false,
          text: 'link 1',
        },
        {
          onClick: () => console.log('clicked2'),
          separator: false,
          text: 'link 2',
        }
      ]
    };
  });

  it('should render', () => {
    snapshot(<DropupBtn {...props} />);
  });

  it('should add open class when button is clicked', () => {
    const props = {
      btn: {
        disabled: false,
        kind: 'danger',
        btnText: 'My button',
      },
      links: [
        {
          onClick: () => console.log('clicked1'),
          separator: false,
          text: 'link 1',
        },
        {
          onClick: () => console.log('clicked2'),
          separator: false,
          text: 'link 2',
        }
      ],
    };
    const wrapper = mount(<DropupBtn {...props} />);
    const btn = wrapper.find('.btn');
    btn.simulate('click');
    expect(wrapper.find('.open').length).toBe(1);
  });
});
