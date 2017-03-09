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
  console.log({url});
  try {
    console.log('try-catch entered');
    const res = await fetch(url);
    console.log({res});
    if (!res.ok) return handleError(url, res);

    const projects = await res.json();

    const projectMap = {};
    for (const project of projects) {
      projectMap[project.id] = project;
    }

    window.setState({projectMap});
  } catch (e) {
    console.log('error occured', {e});
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
    window.setState = this.setState.bind(this);

    // Re-render any time the URL hash changes.
    window.addEventListener('hashchange', () => this.forceUpdate());
  }

  componentDidMount() {
    loadProjects();
  }

  render() {
    const {hash} = getLocationParts();
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
