// @flow
import React, {Component} from 'react';
import Breadcrumbs from '../share/breadcrumbs';
import ButtonSet from '../share/button-set';
import DataDisplay from './data-display';
import DataEntry from './data-entry';
import DropupBtn from '../share/dropup-button';
import LookupInput from '../share/lookup-input';
import TargetSelect from './target-select';
import {defineSetState, setState} from '../util/state-util';
import {getLocationParts} from '../util/hash-route';
import {getUrl} from '../util/url-util';
import {handleError} from '../util/error';
import './app.css';

type BreadcrumbType = {
  id: number,
  label: string
};

async function loadProductCategories() {
  const url = getUrl('product-categories');
  try {
    const res = await fetch(url);
    if (!res.ok) return handleError(url, res);

    const productCategories = await res.json();

    setState({productCategories});
  } catch (e) {
    handleError(url, e);
  }
}

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
    productCategories: [],
    projectMap: {},
    selectedCategory: ''
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
    loadProductCategories();
  }

  onCategorySelect = (category: string) => {
    console.log('app.js onCategorySelect: category =', category);
  };

  onNavigate = (crumb: BreadcrumbType) => {
    this.setState({activeCrumb: crumb});
  };

  render() {
    const {hash} = getLocationParts(window.location);

    const {
      activeCrumb, description, error, name,
      productCategories, projectMap, selectedCategory
    } = this.state;

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
        text: 'My button',
        kind: 'danger',
      },
      links: [
        {
          onClick: () => console.log('clicked1'),
          separator: false,
          text: 'link 1',
        },
      ],
    };

    const categoryOptions =
      productCategories.map(cat => ({text: cat, value: cat}));

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
          <TargetSelect
            categories={categoryOptions}
            onChange={this.onCategorySelect}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    );
  }
}

export default App;
