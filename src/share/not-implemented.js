import React, {PropTypes as t} from 'react';

const NotImplemented = ({name}) =>
  <div className="not-implemented">
    The {name} component is not implemented yet.
  </div>;

NotImplemented.propTypes = {
  name: t.string
};

export default NotImplemented;
