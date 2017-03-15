// @flow
import React, {PropTypes as t} from 'react';

type PropsType = {steps: Array<string>, activeIndex: number};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
};

const WizardSteps = ({steps, activeIndex}: PropsType) => (
  <div className="wizard-steps-container" style={styles.container}>
    {steps.map((s, i) => (
      <div className="step-container" key={i}>
        <span className={activeIndex === i ? 'badge active' : 'badge'}>
          {i + 1}
        </span> {s}
      </div>
    ))}
  </div>
);

WizardSteps.propTypes = {
  activeIndex: t.number.isRequired,
  steps: t.arrayOf(t.string).isRequired
};

export default WizardSteps;
