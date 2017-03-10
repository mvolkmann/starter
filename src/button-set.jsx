// @flow
import React, {PropTypes as t} from 'react';

// Types
type ButtonKindType =
  | 'danger'
  | 'default'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success';

type ButtonType = {
  text: string,
  kind: ButtonKindType,
  onClick: () => any
};

type ButtonSetPropType = {
  buttons: Array<ButtonType>
};

// View
const ButtonSet = ({buttons}: ButtonSetPropType) => (
  <div>
    {buttons.map(button => (
      <button
        className={`btn btn-${button.kind}`}
        key={button.text}
        onClick={button.onClick}
      >
        {button.text}
      </button>
    ))}
  </div>
);

// PropTypes
ButtonSet.propTypes = {
  buttons: t.arrayOf(
    t.shape({
      text: t.string,
      kind: t.oneOf([
        'danger',
        'default',
        'info',
        'primary',
        'secondary',
        'success',
      ]),
      onClick: t.func,
    }),
  ).isRequired,
};

export default ButtonSet;

