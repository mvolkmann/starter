// @flow
import React, {Component} from 'react';
import DataEntry from './data-entry';
import DataDisplay from './data-display';
import {handleError} from './error';
import URLSearchParams from 'url-search-params'; // a polyfill for IE
import 'whatwg-fetch'; //TODO: Is this needed?
import './app.css';

function getLocationParts() {
  return {
    hash: location.hash.substring(1),
    path: location.pathname,
    query: new URLSearchParams(location.search),
  };
}

async function loadProjects() {
  const restUrl = 'https://localhost';
  const url = `${restUrl}/project`;
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
    handleError.bind(null, url);
  }
}

class App extends Component {
  state = {
    name: '',
    projectMap: {},
  };

  constructor() {
    super();
    window.setState = this.setState.bind(this);
    window.addEventListener('hashchange', () => this.forceUpdate());
  }

  componentDidMount() {
    loadProjects();
  }

  render() {
    const {hash} = getLocationParts();
    const {name, projectMap} = this.state;

    return (
      <div className="app">
        {hash === 'display' ?
          <DataDisplay projectMap={projectMap} /> :
            <DataEntry name={name} />}
      </div>
    );
  }
}

export default App;
