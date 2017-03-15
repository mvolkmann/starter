import React, {Component} from 'react';
import WizardSteps from '../share/wizard-steps';
import Select from '../share/select';
import './assign-products.css';

class AssignProducts extends Component {
  static propTypes = {};

  /*
  onSomeEvent = event => {
  };

  constructor() {
    super();

  }
  */

  render() {
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
            onChange={() => console.log('changed selection')}
            options={[
              {text: 'Corn', value: 'corn'},
              {text: 'Broccoli', value: 'broccoli'},
            ]}
            size={2}
            value="hello"
          />
        </div>
      </div>
    );
  }
}

export default AssignProducts;
