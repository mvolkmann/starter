import React, {Component, PropTypes as t} from 'react';
import Select from '../share/select';
import {setState} from '../util/state-util';

type EventType = {
  target: {
    value: string
  }
};

class TargetSelect extends Component {
  static propTypes = {
    categories: t.arrayOf(t.string).isRequired,
    selectedCategory: t.string.isRequired,
    selectedTarget: t.string.isRequired,
    targets: t.arrayOf(t.string).isRequired,
  };

  onCategorySelect = (event: EventType) => {
    setState({selectedCategory: event.target.value});
  };

  onTargetSelect = (event: EventType) => {
    setState({selectedCategory: event.target.value});
  };

  render() {
    const {categories, selectedCategory, selectedTarget, targets} = this.props;

    return (
      <div className="target-select">
        <Select
          label="Product Category"
          onChange={this.onCategorySelect}
          options={categories}
          value={selectedCategory}
        />
        <Select
          label="Product Target"
          onChange={this.onTargetSelect}
          options={targets}
          value={selectedTarget}
        />
      </div>
    );
  }
}

export default TargetSelect;
