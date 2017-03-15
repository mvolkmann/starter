// @flow
import React, {PropTypes as t, Component} from 'react'
import {Dropdown} from 'bootstrap.native'

type BtnKindType =
  | 'danger'
  | 'default'
  | 'info'
  | 'link'
  | 'primary'
  | 'success'

type BtnLinkType = {
  className?: string,
  onClick: () => any,
  separator: boolean,
  text?: string
}

/* eslint-disable react/no-unused-prop-types */
type BtnType = {
  disabled: boolean,
  kind: BtnKindType,
  btnText: string
}
/* eslint-enable react/no-unused-prop-types */

type PropsType = {btn: BtnType, links: Array<BtnLinkType>}

class DropupBtn extends Component {
  top = {};
  toggleElement = () => {
    const dropdown = document.querySelector('.dropdown-toggle')
    // this was done to support testing because we cannot query the dom from a
    // test
    if (dropdown) {
      new Dropdown(dropdown).toggle()
    } else {
      this.top.className += ' open'
    }
  };

  render() {
    const {btn, links}: PropsType = this.props
    return (
      <div className="btn-group dropup" ref={top => this.top = top}>
        <button
          className={`btn btn-${btn.kind} dropdown-toggle`}
          disabled={btn.disabled}
          onClick={this.toggleElement}
          type="button"
        >
          {btn.btnText + ' '}
          <span className="caret" />
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
          {links.map(l => (
            <li
              key={l.text}
              className={l.className}
              onClick={l.onClick}
              role={l.separator ? 'separator' : ''}
            >
              {l.text}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

DropupBtn.propTypes = {
  btn: t.shape({
    kind: t.oneOf([
      'danger',
      'default',
      'info',
      'link',
      'primary',
      'success',
    ]).isRequired,
    btnText: t.string.isRequired,
    disabled: t.bool.isRequired,
  }),
  links: t.arrayOf(
    t.shape({
      className: t.string,
      onClick: t.func.isRequired,
      separator: t.bool.isRequired,
      text: t.string,
    }).isRequired,
  ),
}

export default DropupBtn
