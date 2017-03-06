import React, {Component} from 'react';
import Page1 from './page1';
import Page2 from './page2';
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
    React.setState = this.setState.bind(this);
    window.addEventListener('hashchange', () => this.forceUpdate());
  }

  render() {
    const {hash} = getLocationParts();
    const {name} = this.state;

    return (
      <div className="app">
        {
          hash === 'page2' ? <Page2 name={name} /> : <Page1 name={name} />
        }
      </div>
    );
  }
}

export default App;
