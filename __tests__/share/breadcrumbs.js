import React from 'react';
import Breadcrumbs from '../../src/share/breadcrumbs';
import {mount} from 'enzyme';
import snapshot from '../snapshot';

describe('Breadcrumbs', () => {
  const items = [
    {id: 1, label: 'foo'},
    {id: 2, label: 'bar'},
    {id: 3, label: 'baz'}
  ];
  const onNavigate = jest.fn();
  const jsx =
    <Breadcrumbs
      activeCrumb={2}
      items={items}
      onNavigate={onNavigate}
    />;

  it('should render', () => {
    snapshot(jsx);
  });

  it('should handle clicks', () => {
    const wrapper = mount(jsx);

    const links = wrapper.find('.breadcrumb a');
    // links is an object, not an array!
    // The last crumb is not a link, so we expect 2, not 3.
    expect(links.length).toBe(2);

    const barLink = links.at(1);
    barLink.simulate('click');
    expect(onNavigate).toBeCalled();
  });
});
