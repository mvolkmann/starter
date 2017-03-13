// @flow
import React, {Component, PropTypes as t} from 'react';
import DataInput from './data-input';
import FontAwesome from 'react-fontawesome';
import {getUrl} from './url-util';
import {handleError} from './error';
import {setState} from './state-util';

type EventType = {
  target: {
    name: string,
    value: string
  }
};

async function addProject({name, description}) {
  const url: string = getUrl('project', {name, description});
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
            className="name-input"
            label="Project Name"
            name="name"
            onChange={this.onChange}
            value={this.props.name}
          />
          <DataInput
            className="description-input"
            label="Project Description"
            name="description"
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={this.props.description}
          />
          <button className="add-btn btn" onClick={this.onAdd}>Add</button>
        </div>

        <a href="#display">Show Projects</a>

        <div className="icons">
          <FontAwesome name="envelope-o" size="2x" />
          <FontAwesome name="check-circle" size="2x" style={{color: 'green'}} />

          <span className="fa-stack">
            <FontAwesome name="circle-o" stack="2x" style={{color: 'red'}} />
            <FontAwesome name="exclamation" stack="1x" style={{color: 'red'}} />
          </span>

          <FontAwesome
            name="times-circle-o"
            inverse
            size="2x"
            style={{color: 'red'}}
          />
        </div>
      </div>
    );
  }
}

export default DataEntry;
