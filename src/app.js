// @flow
import React, {Component} from 'react';
import DataEntry from './data-entry';
import DataDisplay from './data-display';
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

function handleError(url, res) {
  console.log('app.js handleError: entered');
  window.setState(res.status === 440 ?
    {error: 'Session Timeout', route: 'login'} :
    {error: res.message});
}

class App extends Component {
  state = {name: ''};

  constructor() {
    super();
    window.setState = this.setState.bind(this);
    window.addEventListener('hashchange', () => this.forceUpdate());
  }

  componentDidMount() {
    async function loadProjects() {
      const restUrl = 'https://localhost';
      const url = `${restUrl}/project`;
      console.log('app.js componentDidMount: url =', url);
      try {
        const res = await fetch(url);
        console.log('app.js componentDidMount: res =', res);
        if (!res.ok) return handleError(url, res);

        const projects = await res.json();
        console.log('app.js componentDidMount: projects =', projects);

        const projectMap = {};
        for (const project of projects) {
          projectMap[project.id] = project.flavor;
        }

        window.setState({projectMap});
      } catch (e) {
        console.log('app.js componentDidMount: e =', e);
        handleError.bind(null, url);
      }

      console.log('app.js componentDidMount: called fetch');
    }

    loadProjects();
  }

  render() {
    const {hash} = getLocationParts();
    const {name} = this.state;

    return (
      <div className="app">
        {
          hash === 'display' ?
            <DataDisplay name={name} /> :
            <DataEntry name={name} />
        }
      </div>
    );
  }
}

export default App;
