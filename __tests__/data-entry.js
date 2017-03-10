import React from 'react';
import DataEntry from '../src/data-entry';
import {defineSetState} from '../src/state-util';
import {mount} from 'enzyme';
import snapshot from './snapshot';

describe('DataEntry', () => {
  const projectMap = {
    1: {id: 1, name: 'Foo', description: 'desc 1'},
    2: {id: 2, name: 'Bar', description: 'desc 2'}
  };

  let state;

  function addCheck(state, projectName, done) {
    setTimeout(() => { // run in next tick
      try {
        expect(state.name).toBe('');
        const id = 3;
        const project = state.projectMap[id];
        expect(project).toEqual({id, name: projectName});
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
        text: () => 3 // id of new project
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

  it('should support name entry', () =>
    new Promise(resolve => {
      const expectedName = 'My New Project';
      defineSetState(newState => {
        expect(newState).toEqual({name: expectedName});
        resolve();
      });

      const wrapper = mount(<DataEntry description="" name="" />);
      const input = wrapper.find('input').first();
      input.simulate('change', {target: {value: expectedName}});
    }));

  fit('should add a project by pressing Add button', done => {
    addSetup();

    state = {name: '', projectMap};
    const projectName = 'My New Project';
    const description = 'My description';
    const wrapper = mount(
      <DataEntry description={description} name={projectName} />
    );
    const addBtn = wrapper.find('.add-btn');
    addBtn.simulate('click');

    addCheck(state, projectName, done);
  });

  it('should add a project by pressing enter key', done => {
    addSetup();

    state = {name: '', projectMap};
    const projectName = 'My New Project';
    const description = 'My description';
    const wrapper = mount(
      <DataEntry description={description} name={projectName} />
    );
    const input = wrapper.find('input');
    input.simulate('keyPress', {which: 13});

    addCheck(state, projectName, done);
  });
});
