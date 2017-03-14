// @flow
import React, {PropTypes as t} from 'react'

// Types
type ButtonKindType =
  | 'danger'
  | 'default'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success'

type ButtonType = {
  disabled?: boolean,
  kind: ButtonKindType,
  text: string,
  onClick: () => any
}

type ButtonSetPropsType = {
  buttons: Array<ButtonType>
}

// View
const ButtonSet = ({buttons}: ButtonSetPropsType) => (
  <div className="button-set">
    {buttons.map(button => (
      <button
        className={`btn btn-${button.kind}`}
        disabled={button.disabled}
        key={button.text}
        onClick={button.onClick}
      >
        {button.text}
      </button>
    ))}
  </div>
)

// PropTypes
ButtonSet.propTypes = {
  buttons: t.arrayOf(
    t.shape({
      disabled: t.bool,
      kind: t.oneOf([
        'danger',
        'default',
        'info',
        'primary',
        'secondary',
        'success',
      ]),
      text: t.string,
      onClick: t.func,
    }),
  ).isRequired,
}

export default ButtonSet
