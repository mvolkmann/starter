import React, {PropTypes as t} from 'react'
import {Breadcrumb} from 'react-bootstrap'

const {Item} = Breadcrumb

const Breadcrumbs = ({activeCrumb, items, onNavigate}) => {
  const activeId = activeCrumb ?
    activeCrumb.id :
    items.length ? items[items.length - 1].id : null
  return (
    <Breadcrumb>
      {items.map(item => {
        const active = activeId === item.id
        const handlers = active ? {} : {onClick: () => onNavigate(item)}
        return (
          <Item active={active} key={item.id} {...handlers}>
            {item.label}
          </Item>
        )
      })}
    </Breadcrumb>
  )
}

Breadcrumbs.displayName = 'Breadcrumbs'

Breadcrumbs.propTypes = {
  activeCrumb: t.shape({
    id: t.number,
    label: t.string,
  }),
  items: t.arrayOf(
    t.shape({
      id: t.number.isRequired,
      label: t.string.isRequired,
    }),
  ).isRequired,
  onNavigate: t.func.isRequired,
}

export default Breadcrumbs
