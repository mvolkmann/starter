import React, {PropTypes as t} from 'react'
import {Breadcrumb} from 'react-bootstrap'

const {Item} = Breadcrumb

const Breadcrumbs = ({activeCrumb, items, onNavigate}) => {
  // If no active crumb was specified, make it the last one.
  if (activeCrumb === undefined && items.length) {
    activeCrumb = items[items.length - 1].id;
  }

  return (
    <Breadcrumb>
      {items.map(item => {
        const active = item.id === activeCrumb;
        const handlers = active ? {} : {onClick: () => onNavigate(item)};
        return (
          <Item active={active} key={item.id} {...handlers}>
            {item.label}
          </Item>
        )
      })}
    </Breadcrumb>
  )
}

Breadcrumbs.propTypes = {
  activeCrumb: t.number,
  items: t.arrayOf(
    t.shape({
      id: t.number.isRequired,
      label: t.string.isRequired,
    }),
  ).isRequired,
  onNavigate: t.func.isRequired,
}

export default Breadcrumbs
