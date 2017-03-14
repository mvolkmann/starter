// @flow
import React, {PropTypes as t} from 'react'

type PropsType = {steps: Array<string>}

const WizardSteps = ({steps}: PropsType) => (
  <div className="wizard-steps-container">
    {steps.map((s, i) => (
      <div className="step-container" key={i}>
        <span className="badge">{i}</span> {s}
      </div>
    ))}
  </div>
)

WizardSteps.displayName = 'WizardSteps'

WizardSteps.propTypes = {
  steps: t.arrayOf(t.string),
}

export default WizardSteps
