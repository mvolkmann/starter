// @flow
import React, {Component, PropTypes as t} from 'react';
import {setState} from './state-util';
import {handleError} from './error';
import DataInput from './data-input';
import getUrl from './url-util';

type EventType = {
  target: {
    name: string,
    value: string
  }
};

async function addProject({name, description}) {
  let url: string = getUrl('project', {name, description});
  url += `&description=${description}`;
  try {
    const res = await fetch(url, {method: 'POST'});
    if (!res.ok) return handleError(url, res);

    const id = await res.text();
    setState(state => {
      const {projectMap} = state;
      projectMap[id] = {id, name, description};
      return {projectMap};
    });
  } catch (e) {
    handleError(url, e);
  }
}

class DataEntry extends Component {
  static propTypes = {
    description: t.string,
    name: t.string,
  };

  onAdd = () => {
    addProject(this.props);
    setState({name: '', description: ''});
  };

  onKeyPress = (event: EventType) => {
    if (event.which === 13) this.onAdd();
  };

  onChange = (event: EventType) => {
    const {name, value} = event.target;
    setState({[name]: value});
  };

  render() {
    return (
      <div className="data-entry">
        <div>
          <DataInput
            label="Project Name"
            name="name"
            onChange={this.onChange}
            value={this.props.name}
          />
          <DataInput
            label="Project Description"
            name="description"
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={this.props.description}
          />
          <button className="add-btn" onClick={this.onAdd}>Add</button>
        </div>
        <a href="#display">Show Projects</a>
      </div>
    );
  }
}

export default DataEntry;
