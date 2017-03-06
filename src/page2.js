import React, {PropTypes as t} from 'react';

const Page2 = ({name = 'World'}) =>
  <div className="page1">
    <h2>Hello, {name}!</h2>
    <div>
      <a href="#page1">Go to Page 1</a>
    </div>
  </div>;

Page2.propTypes = {
  name: t.string
};

export default Page2;
