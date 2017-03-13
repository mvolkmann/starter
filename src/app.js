// @flow
import React, {Component} from 'react';
import ButtonSet from './button-set';
import LookupInput from './lookup-input';
import DataEntry from './data-entry';
import DataDisplay from './data-display';
import {defineSetState, setState} from './state-util';
import {getLocationParts} from './hash-route';
import {getUrl} from './url-util';
import {handleError} from './error';
import './app.css';

async function loadProjects() {
  const url = getUrl('project');
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
    //console.error('app.js loadProjects: e =', e);
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
    const buttons = [
      {
        disabled: true,
        text: 'Save',
        kind: 'primary',
        onClick: () => console.log('saved!'),
      },
      {
        disabled: false,
        text: 'Info',
        kind: 'info',
        onClick: () => console.log('info!'),
      },
      {
        text: 'Cancel',
        kind: 'danger',
        onClick: () => console.log('cancelled!'),
      },
    ];

    const input = {
      img: 'search',
      onChange: event => console.log(event.target.value),
    };

    return (
      <div className="app">
        <div className="error">{error}</div>
        <div className="body">
          {hash === 'display' ?
            <DataDisplay projectMap={projectMap} /> :
            <DataEntry description={description} name={name} />}
          <ButtonSet buttons={buttons} />
          <LookupInput img={input.img} onChange={input.onChange} />
        </div>
      </div>
    );
  }
}

export default App;
