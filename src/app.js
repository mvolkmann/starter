// @flow
import React, {Component} from 'react';
import DataEntry from './data-entry';
import DataDisplay from './data-display';
import URLSearchParams from 'url-search-params'; // a polyfill for IE
import './app.css';

function getLocationParts() {
  return {
    hash: location.hash.substring(1),
    path: location.pathname,
    query: new URLSearchParams(location.search),
  };
}

class App extends Component {
  state = {name: ''};

  constructor() {
    super();
    window.setState = this.setState.bind(this);
    window.addEventListener('hashchange', () => this.forceUpdate());
  }

  render() {
    const {hash} = getLocationParts();
    const {name} = this.state;

    return (
      <div className="app">
        {hash === 'display' ?
          <DataDisplay name={name} /> :
            <DataEntry name={name} />}
      </div>
    );
  }
}

export default App;
