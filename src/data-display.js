// @flow
import React, {PropTypes as t} from 'react';

type PropsType = {name: string}

const DataDisplay = ({name = 'World'}: PropsType) => (
  <div className="data-display">
    <h2>Hello, {name}!</h2>
    <div>
      <a href="#entry">Go to Page 1</a>
    </div>
  </div>
);

DataDisplay.propTypes = {
  name: t.string,
};

export default DataDisplay;
