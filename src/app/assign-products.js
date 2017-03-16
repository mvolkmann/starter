import React, {Component, PropTypes as t} from 'react';
import WizardSteps from '../share/wizard-steps';
import Select from '../share/select';
import {setState} from '../util/state-util';
import {getUrl} from '../util/url-util';
import {handleError} from '../util/error';
import './assign-products.css';

/*
async function loadData(data: string) {
  const url = getUrl(data);
  try {
    const res = await fetch(url);
    if (!res.ok) return handleError(url, res);

    const jsonData = await res.json();

    setState({[data]: jsonData});
  } catch (e) {
    handleError(url, e);
  }
}
*/

async function loadCrops() {
  const url = getUrl('crops');
  try {
    const res = await fetch(url);
    if (!res.ok) return handleError(url, res);

    const crops = await res.json();
    console.log('assign-products.js: ', {crops});
    setState({crops});
  } catch (e) {
    handleError(url, e);
  }
}

class AssignProducts extends Component {
  static propTypes = {
    crops: t.arrayOf(t.string),
    //availableMcts: t.arrayOf(t.string),
    //availableRegions: t.arrayOf(t.string),
  };

  componentDidMount() {
    loadCrops();
  }

  /*
  onSomeEvent = event => {
  };

  constructor() {
    super();

  }
  */

  render() {
    const {crops} = this.props;
    const wizardSteps = {
      steps: ['Assign Products', 'Add Trail Data', 'Add Observations'],
      activeIndex: 0,
    };

    return (
      <div className="assign-products">
        <div className="title">
          <h3>Advance Products to 4A</h3>
          <WizardSteps {...wizardSteps} />
        </div>
        <h4>Assign Products to PMT</h4>
        <div className="select-container">
          <Select
            name="crop"
            onChange={() => console.log('changed selection')}
            options={crops}
            size={1}
            value="hello"
          />
        </div>
      </div>
    );
  }
}

export default AssignProducts;
