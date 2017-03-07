// @flow
import React, {Component, PropTypes as t} from 'react';

type EventType = {
  target: {
    value: string
  }
}

class DataEntry extends Component {
  static propTypes = {
    name: t.string,
  };

  onChange = (event: EventType) => window.setState({name: event.target.value});

  render() {
    return (
      <div className="data-entry">
        <div>
          <label>Name</label>
          <input
            autoFocus
            onChange={this.onChange}
            type="text"
            value={this.props.name}
          />
        </div>
        <a href="#display">Go to Page 2</a>
      </div>
    );
  }
}

export default DataEntry;
