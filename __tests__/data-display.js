import React from 'react';
import DataDisplay from '../src/data-display';
import {mount} from 'enzyme';
import snapshot from './snapshot';

describe('DataDisplay', () => {
  const projectMap = {
    1: {id: 1, name: 'Foo'},
    2: {id: 2, name: 'Bar'}
  };

  it('should render', () => {
    snapshot(<DataDisplay projectMap={projectMap} />);
  });

  it('should delete a project', () => {
    // Mock the fetch call to delete a project.
    window.BASE_URL = 'https://localhost';
    window.fetch = jest.fn().mockImplementation((url, options) => {
      expect(url).toContain(`${window.BASE_URL}/project/`);
      expect(options.method).toBe('DELETE');
      return Promise.resolve({ok: true});
    });

    // Mock the React setState method that the app makes global.
    window.setState = fn => {
      const state = {projectMap};
      const newState = fn(state);
      expect(newState).toEqual({projectMap: {1: projectMap[1]}});
      return newState;
    };
    const wrapper = mount(<DataDisplay projectMap={projectMap} />);

    // Find the delete button for "bar".
    // It is the first one because "bar" precedes "foo" alphabetically.
    const deleteBtn = wrapper.find('.delete-btn').first();

    deleteBtn.simulate('click');
  });
});
