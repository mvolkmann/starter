// @flow
import React, {PropTypes as t} from 'react';
import './wizard-steps.css';

type PropsType = {steps: Array<string>, activeIndex: number};

const WizardSteps = ({steps, activeIndex}: PropsType) => (
  <div className="wizard-steps">
    {steps.map((s, i) => (
      <div className="step" key={i}>
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
