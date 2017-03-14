// @flow
import React, {Component} from 'react';
import Breadcrumbs from './breadcrumbs';
import ButtonSet from './button-set';
import DataEntry from './data-entry';
import DataDisplay from './data-display';
import DropupBtn from './dropup-button';
import LookupInput from './lookup-input';
import {defineSetState, setState} from './state-util';
import {getLocationParts} from './hash-route';
import {getUrl} from './url-util';
import {handleError} from './error';
import './app.css';

type BreadcrumbType = {
  id: number,
  label: string
};

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
    activeCrumb: undefined,
    description: '',
    error: '',
    name: '',
    projectMap: {},
  };

  breadcrumbs = [
    {id: 1, label: 'Foo'},
    {id: 2, label: 'Bar'},
    {id: 3, label: 'Baz'},
  ];

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

  onNavigate = (crumb: BreadcrumbType) => {
    this.setState({activeCrumb: crumb});
  };

  render() {
    const {hash} = getLocationParts(window.location);
    const {activeCrumb, description, error, name, projectMap} = this.state;
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
      onChange: (event = {}) => console.log(event.target.value),
      onSubmit: () => console.log('clicked!'),
    };

    const dropupBtnParams = {
      btn: {
        disabled: false,
        kind: 'danger',
        btnText: 'My button',
      },
      links: [
        {
          onClick: () => console.log('clicked1'),
          separator: false,
          text: 'link 1',
        },
        {
          onClick: () => console.log('clicked2'),
          separator: false,
          text: 'link 2',
        }
      ],
    };

    return (
      <div className="app">
        <Breadcrumbs
          activeCrumb={activeCrumb}
          items={this.breadcrumbs}
          onNavigate={this.onNavigate}
        />
        <div className="error">{error}</div>
        <div className="body">
          {hash === 'display' ?
            <DataDisplay projectMap={projectMap} /> :
            <DataEntry description={description} name={name} />}
          <ButtonSet buttons={buttons} />
          <LookupInput {...input} />
          <DropupBtn {...dropupBtnParams} />
        </div>
      </div>
    );
  }
}

export default App;
