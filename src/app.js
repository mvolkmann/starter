// @flow
import React, {Component} from 'react';
import DataEntry from './data-entry';
import DataDisplay from './data-display';
import {getLocationParts} from './hash-route';
import {handleError} from './error';
import './app.css';

window.BASE_URL = 'https://localhost';

async function loadProjects() {
  const url = `${window.BASE_URL}/project`;
  try {
    const res = await fetch(url);
    if (!res.ok) return handleError(url, res);

    const projects = await res.json();

    const projectMap = {};
    for (const project of projects) {
      projectMap[project.id] = project;
    }

    window.setState({projectMap});
  } catch (e) {
    handleError(url, e);
  }
}

class App extends Component {
  state = {
    error: '',
    name: '',
    projectMap: {},
  };

  constructor() {
    super();

    // Allow any component to change the state of this top-most component.
    window.setState = this.setState.bind(this);

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
        {hash === 'display' ?
          <DataDisplay projectMap={projectMap} /> :
            <DataEntry name={name} />}
      </div>
    );
  }
}

export default App;
