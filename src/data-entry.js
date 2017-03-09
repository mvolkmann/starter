// @flow
import React, {Component, PropTypes as t} from 'react';
import {handleError} from './error';

type EventType = {
  target: {
    value: string
  }
};

async function addProject(name) {
  const url = `${window.BASE_URL}/project?name=${name}`;
  try {
    const res = await fetch(url, {method: 'POST'});
    if (!res.ok) return handleError(url, res);

    const id = await res.text();
    window.setState(state => {
      const {projectMap} = state;
      projectMap[id] = {id, name};
      return {projectMap};
    });
  } catch (e) {
    handleError(url, e);
  }
}

class DataEntry extends Component {
  static propTypes = {
    name: t.string,
  };

  onAdd = () => {
    addProject(this.props.name);
    window.setState({name: ''});
  };

  onKeyPress = (event: EventType) => {
    if (event.which === 13) this.onAdd();
  };

  onChange = (event: EventType) => window.setState({name: event.target.value});

  render() {
    return (
      <div className="data-entry">
        <div>
          <label>Project Name</label>
          <input
            autoFocus
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            type="text"
            value={this.props.name}
          />
          <button className="add-btn" onClick={this.onAdd}>Add</button>
        </div>
        <a href="#display">Show Projects</a>
      </div>
    );
  }
}

export default DataEntry;
