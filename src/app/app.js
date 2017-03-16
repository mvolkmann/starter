// @flow
import React, {Component, PropTypes as t} from 'react';
import AddObservations from './add-observations';
import Breadcrumbs from '../share/breadcrumbs';
import ButtonSet from '../share/button-set';
import DataDisplay from './data-display';
import DataEntry from './data-entry';
import DateRange from '../share/date-range';
import DropupBtn from '../share/dropup-button';
import LookupInput from '../share/lookup-input';
import Select from '../share/select';
import WizardSteps from '../share/wizard-steps';
import moment from 'moment';
import NotImplemented from '../share/not-implemented';
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

type EventType = {
  target: {
    value: string
  }
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

type PropsType = {
  date: Object
};

class App extends Component {
  static propTypes = {
    date: t.object, // moment (just for tests)
  };

  state = {
    activeCrumb: undefined,
    description: '',
    endDate: undefined,
    error: '',
    name: '',
    productCategories: [],
    productTargets: [],
    projectMap: {},
    selectedCategory: '',
    selectedTarget: '',
    selected: '',
    startDate: undefined,
  };

  breadcrumbs = [
    {id: 1, label: 'Foo'},
    {id: 2, label: 'Bar'},
    {id: 3, label: 'Baz'},
  ];

  constructor(props: PropsType) {
    super(props);

    const date = props.date ? props.date : moment();
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.startDate = (this.state.endDate = date);

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

  onEndDateChanged = (endDate: Object) => {
    this.setState({endDate});
  };

  onNavigate = (crumb: BreadcrumbType) => {
    this.setState({activeCrumb: crumb.id});
  };

  onStartDateChanged = (startDate: Object) => {
    this.setState({startDate});
  };

  onSelected = (event: EventType) =>
    this.setState({selected: event.target.value});

  render() {
    const {hash} = getLocationParts(window.location);

    const {
      activeCrumb,
      description,
      endDate,
      error,
      name,
      productCategories,
      productTargets,
      projectMap,
      selectedCategory,
      selectedTarget,
      startDate,
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
        },
      ],
    };

    const wizardSteps = {
      steps: ['Assign Products', 'Add Trail Data', 'Add Observations'],
      activeIndex: 0,
    };

    const categoryOptions = productCategories.map(cat => ({
      text: cat,
      value: cat,
    }));

    const targetOptions = productTargets.map(target => ({
      text: target,
      value: target,
    }));

    return (
      <div className="app">
        <h3>Breadcrumbs</h3>
        <Breadcrumbs
          activeCrumb={activeCrumb}
          items={this.breadcrumbs}
          onNavigate={this.onNavigate}
        />

        <div className="error">{error}</div>

        <h3>Routes</h3>
        <div className="route-btns">
          <a className="btn btn-default" href="#display">
            Display
          </a>
          <a className="btn btn-default" href="#entry">
            Add
          </a>
          <a className="btn btn-default" href="#assign-products">
            Assign Products
          </a>
          <a className="btn btn-default" href="#add-observations">
            Add Observations
          </a>
        </div>

        <div className="body">
          {hash === 'display' ?
            <DataDisplay projectMap={projectMap} /> :
            hash === 'entry' ?
              <DataEntry description={description} name={name} /> :
                hash === 'assign-products' ?
                  <NotImplemented name="AssignProducts" /> :
                    hash === 'add-observations' ? <AddObservations /> : null}
        </div>

        <hr />

        <h3>ButtonSet Component</h3>
        <ButtonSet buttons={buttons} />

        <hr />

        <h3>LookupInput Component</h3>
        <LookupInput {...input} />

        <hr />

        <h3>DropupBtn Component</h3>
        <DropupBtn {...dropupBtnParams} />

        <hr />

        <h3>DateRange Component</h3>
        <div>
          <label>Date Range</label>
          <DateRange
            startDate={startDate}
            endDate={endDate}
            onStartDateChanged={this.onStartDateChanged}
            onEndDateChanged={this.onEndDateChanged}
          />
        </div>

        <hr />

        <h3>WizardSteps Component</h3>
        <WizardSteps {...wizardSteps} />

        <hr />

        <h3>TargetSelect Component</h3>
        <TargetSelect
          categories={categoryOptions}
          onChange={this.onCategorySelect}
          selectedCategory={selectedCategory}
          selectedTarget={selectedTarget}
          targets={targetOptions}
        />

        <hr />

        <h3>Select Component</h3>
        <Select
          onChange={this.onSelected}
          options={[
            {text: 'A', value: 'a'},
            {text: 'B', value: 'b'},
            {text: 'C', value: 'c'},
          ]}
          size={1}
          value={this.state.selected}
        />

      </div>
    );
  }
}

export default App;
