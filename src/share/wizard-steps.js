// @flow
import React, {PropTypes as t} from 'react';

type PropsType = {steps: Array<string>};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
};

const WizardSteps = ({steps}: PropsType) => (
  <div className="wizard-steps-container" style={styles.container}>
    {steps.map((s, i) => (
      <div className="step-container" key={i}>
        <span className="badge">{i + 1}</span> {s}
      </div>
    ))}
  </div>
);

WizardSteps.displayName = 'WizardSteps';

WizardSteps.propTypes = {
  steps: t.arrayOf(t.string),
};

export default WizardSteps;
