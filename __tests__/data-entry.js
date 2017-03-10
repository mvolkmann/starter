import React from 'react';
import DataEntry from '../src/data-entry';
import {defineSetState} from '../src/state-util';
import {mount} from 'enzyme';
import snapshot from './snapshot';

describe('DataEntry', () => {
  const projectMap = {
    1: {id: 1, name: 'Foo', description: 'desc 1'},
    2: {id: 2, name: 'Bar', description: 'desc 2'},
  };

  let state;

  function addCheck(state, name, description, done) {
    setTimeout(() => {
      // run in next tick
      try {
        expect(state.name).toBe('');
        const id = 3;
        const project = state.projectMap[id];
        expect(project).toEqual({id, name, description});
        done();
      } catch (e) {
        done.fail(e);
      }
    });
  }

  function addSetup() {
    // Mock the fetch call to add a project, returning id 3.
    window.fetch = jest.fn().mockImplementation((url, options) => {
      expect(options.method).toBe('POST');
      return Promise.resolve({
        ok: true,
        text: () => 3, // id of new project
      });
    });

    defineSetState(thing => {
      const newState = typeof thing === 'function' ? thing(state) : thing;
      state = Object.assign(state, newState);
    });
  }

  it('should render', () => {
    const name = 'My Project';
    const description = 'My description';
    snapshot(<DataEntry description={description} name={name} />);
  });

  it(
    'should support name entry',
    () =>
      new Promise(resolve => {
        const expected = 'My New Project';

        defineSetState(newState => {
          expect(newState).toEqual({name: expected});
          resolve();
        });

        const wrapper = mount(<DataEntry description="" name="" />);
        const input = wrapper.find('.name-input input');
        input.simulate('change', {target: {name: 'name', value: expected}});
      })
  );

  it(
    'should support description entry',
    () =>
      new Promise(resolve => {
        const expected = 'My Description';

        defineSetState(newState => {
          expect(newState).toEqual({description: expected});
          resolve();
        });

        const wrapper = mount(<DataEntry description="" name="" />);
        const input = wrapper.find('.description-input input');
        input.simulate('change',
          {target: {name: 'description', value: expected}});
      })
  );

  it('should add a project by pressing Add button', done => {
    addSetup();

    state = {name: '', description: '', projectMap};
    const onKeyPress = jest.fn();
    const name = 'My New Project';
    const description = 'My Project desc';
    const wrapper = mount(
      <DataEntry
        description={description}
        name={name}
        onKeyPress={onKeyPress}
      />
    );
    const addBtn = wrapper.find('.add-btn');
    addBtn.simulate('click');

    addCheck(state, name, description, done);
  });

  it('should add a project by pressing enter key', done => {
    addSetup();

    state = {name: '', projectMap};
    const name = 'My New Project';
    const description = 'My description';
    const wrapper = mount(
      <DataEntry description={description} name={name} />
    );
    const input = wrapper.find('.description-input');
    input.simulate('keyPress', {which: 13});

    addCheck(state, name, description, done);
  });
});

