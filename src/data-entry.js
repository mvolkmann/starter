// @flow
import React, {Component, PropTypes as t} from 'react';
import {handleError} from './error';
import 'whatwg-fetch'; //TODO: Is this needed?

type EventType = {
  target: {
    value: string
  }
};

async function addProject(name) {
  const restUrl = 'https://localhost';
  const url = `${restUrl}/project?name=${name}`;
  try {
    const res = await fetch(url, {method: 'POST'});
    if (res.ok) {
      const id = await res.text();
      window.setState(state => {
        const {projectMap} = state;
        projectMap[id] = {id, name};
        return {projectMap};
      });
    } else {
      handleError(url, res);
    }
  } catch (e) {
    handleError.bind(null, url);
  }
}

class DataEntry extends Component {
  static propTypes = {
    name: t.string
  };

  onAdd = () => {
    addProject(this.props.name);
    window.setState({name: ''});
  };

  onChange = (event: EventType) =>
    window.setState({name: event.target.value});

  render() {
    return (
      <div className="data-entry">
        <div>
          <label>Project Name</label>
          <input
            autoFocus
            onChange={this.onChange}
            type="text"
            value={this.props.name}
          />
          <button onClick={this.onAdd}>Add</button>
        </div>
        <a href="#display">Go to Page 2</a>
      </div>
    );
  }
}

export default DataEntry;
