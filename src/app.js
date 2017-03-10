// @flow
import React, {Component} from 'react';
import {defineSetState, setState} from './reduxless';
import DataEntry from './data-entry';
import DataDisplay from './data-display';
import {getLocationParts} from './hash-route';
import {handleError} from './error';
import './app.css';
import getUrl from './url-util';

async function loadProjects() {
  const url = getUrl('project');
  try {
    const res = await fetch(url);
    if (!res.ok) return handleError(url, res);

    const projects = await res.json();

    const projectMap = {};
    for (const project of projects) {
      projectMap[project.id] = project;
    }

    setState({projectMap});
  } catch (e) {
    handleError(url, e);
  }
}

class App extends Component {
  state = {
    description: '',
    error: '',
    name: '',
    projectMap: {},
  };

  constructor() {
    super();

    // Allow any component to change the state of this top-most component.
    defineSetState(this);

    // Re-render any time the URL hash changes.
    window.addEventListener('hashchange', () => this.forceUpdate());
  }

  componentDidMount() {
    loadProjects();
  }

  render() {
    const {hash} = getLocationParts(window.location);
    const {error, name, projectMap} = this.state;

    return (
      <div className="app">
        <div className="error">{error}</div>
        {
          hash === 'display' ?
          <DataDisplay projectMap={projectMap} /> :
          <DataEntry // eslint-disable-line react/jsx-indent
            description={description}
            name={name}
          />
        }
      </div>
    );
  }
}

export default App;
