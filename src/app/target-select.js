import React, {Component, PropTypes as t} from 'react';
import Select from '../share/select';
import {setState} from '../util/state-util';

class TargetSelect extends Component {
  static propTypes = {
    categories: t.arrayOf(t.string).isRequired,
    selectedCategory: t.string.isRequired,
  };

  onCategorySelect = (event: object) => {
    setState({selectedCategory: event.target.value});
  };

  render() {
    const {categories, selectedCategory} = this.props;

    return (
      <div className="target-select">
        <Select
          label="Product Category"
          onChange={this.onCategorySelect}
          options={categories}
          value={selectedCategory}
        />
      </div>
    );
  }
}

export default TargetSelect;
