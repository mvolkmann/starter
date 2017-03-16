import React from 'react';
import WizardSteps from '../../src/share/wizard-steps';
import snapshot from '../snapshot';

describe('WizardSteps', () => {
  it('should render', () => {
    const props = {
      steps: [
        'Assign Products',
        'Add Trail Data',
        'Add Observations'
      ],
      activeIndex: 0
    };

    snapshot(<WizardSteps {...props} />);
  });
});
