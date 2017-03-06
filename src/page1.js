import React, {Component, PropTypes as t} from 'react';

class Page1 extends Component {
  static propTypes = {
    name: t.string
  };

  onChange = event => React.setState({name: event.target.value});

  render() {
    return (
      <div className="page1">
        <div>
          <label>Name</label>
          <input
            autoFocus
            onChange={this.onChange}
            type="text"
            value={this.props.name}
          />
        </div>
        <div>
          <a href="#page2">Go to Page 2</a>
        </div>
      </div>
    );
  }
}

export default Page1;
