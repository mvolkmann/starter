// @flow
import React, {Component} from 'react';
import DataEntry from './data-entry';
import DataDisplay from './data-display';
import {defineSetState, setState} from './state-util';
import {getLocationParts} from './hash-route';
import {getUrl} from './url-util';
import {handleError} from './error';
import './app.css';

async function loadProjects() {
  const url = getUrl('project');
  console.log('app.js loadProjects: url =', url);
  try {
    const res = await fetch(url);
    console.log('app.js loadProjects: res =', res);
    if (!res.ok) return handleError(url, res);

    const projects = await res.json();

    const projectMap = {};
    for (const project of projects) {
      projectMap[project.id] = project;
    }

    console.log('app.js loadProjects: projectMap =', projectMap);
    setState({projectMap});
  } catch (e) {
    console.error('app.js loadProjects: e =', e);
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
    const {description, error, name, projectMap} = this.state;

    return (
      <div className="app">
        <div className="error">{error}</div>
        {hash === 'display' ?
          <DataDisplay projectMap={projectMap} /> :
          <DataEntry // eslint-disable-line react/jsx-indent
            description={description}
            name={name}
            />}
      </div>
    );
  }
}

export default App;
