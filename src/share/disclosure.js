import React, {Component, PropTypes as t} from 'react';
import {Button} from 'react-bootstrap';

class Disclosure extends Component {
  static displayName = 'Disclosure';

  static propTypes = {
    allOpen: t.bool,
    level: t.number,
    tree: t.shape({
      parent: t.any,
      children: t.arrayOf(t.any)
    }).isRequired
  };

  state = {
    allOpen: this.props.allOpen,
    open: this.props.allOpen
  };

  componentWillReceiveProps(props) {
    const {allOpen} = props;
    this.setState({allOpen, open: allOpen});
  }

  toggle = () => {
    this.setState({open: !this.state.open});
  };

  toggleAll = () => {
    const newValue = !this.state.allOpen;
    this.setState({allOpen: newValue, open: newValue});
  };

  render() {
    const {allOpen, open} = this.state;
    const {children, parent} = this.props.tree;
    const triangle = open ? 'bottom' : 'right';
    const classes =
      `disclosure-triangle glyphicon glyphicon-triangle-${triangle}`;

    const level = this.props.level || 0;

    let buttons = null;
    if (level === 0) {
      const label = allOpen ? 'Collapse All' : 'Expand All';
      buttons = (
        <div>
          <Button
            className="toggleAll"
            onClick={this.toggleAll}
          >
            {label}
          </Button>
        </div>
      );
    }

    let childrenToRender = null;
    if (children) {
      const childStyle = {marginLeft: '20px'};
      childrenToRender = children.map(child =>
        typeof child === 'object' ?
          <Disclosure
            allOpen={allOpen}
            key={child.id}
            level={level + 1}
            tree={child}
          /> :
          <div key={child} style={childStyle}>{child}</div>);
    }

    const parentStyle = level === 0 ? {} : {marginLeft: '17px'};

    return (
      <div className="disclosure" style={parentStyle}>
        {buttons}
        <div key="parent-container">
          <span className={classes} onClick={this.toggle} />
          {parent}
        </div>
        { open ? childrenToRender : null }
      </div>
    );
  }
}

export default Disclosure;
