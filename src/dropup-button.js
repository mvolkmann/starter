// @flow
import React, {PropTypes as t} from 'react';

type ButtonKindType =
  | 'danger'
  | 'default'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success';

type BtnLinkType = {
  className?: string,
  onClick: () => any,
  separator: boolean,
  text: string
};

type BtnType = {
  text: string,
  kind: ButtonKindType
};

type DropupBtnPropsType = {btn: BtnType, links: Array<BtnLinkType>};

const DropupBtn = ({btn, links}: DropupBtnPropsType) =>
  (
    <div className="btn-group dropup">
      <button
        type="button"
        className={`btn btn-${btn.kind}`}
      >
        {btn.text}
      </button>
      <button
        type="button"
        className="btn btn-default dropdown-toggle"
        dataToggle="dropdown"
        ariaHaspopup="true"
        ariaExpanded="false"
      >
        <span className="caret" />
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu">
        {
          links.map(l =>
            <li
              key={l.text}
              className={l.className}
              onClick={l.onClick}
              role={l.separator ? 'separator' : ''}
            >
              {l.text}
            </li>)
        }
      </ul>
    </div>
  );

DropupBtn.displayName = 'DropupBtn';

DropupBtn.propTypes = {
  btn: t.shape({
    kind: t.oneOf([
      'danger',
      'default',
      'info',
      'primary',
      'secondary',
      'success'
    ]).isRequired,
    //text: t.string.isRequired
  }),
  links: t.arrayOf(
    t.shape({
      className: t.string,
      onClick: t.func.isRequired,
      separator: t.bool.isRequired,
      text: t.string.isRequired
    }).isRequired
  )
};

export default DropupBtn;
