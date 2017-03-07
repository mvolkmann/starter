// @flow
import React, {PropTypes as t} from 'react';

type ProjectType = {
  id: number,
  name: string,
  description: string
};

type ProjectMapType = {
  [id: string]: ProjectType
};

type PropsType = {
  name: string,
  projectMap: ProjectMapType
};

const DataDisplay = ({name = 'World', projectMap}: PropsType) => {
  const sortedProjects = Object.values(projectMap)
    .sort((p1: ProjectType, p2: ProjectType) => p1.name.localeCompare(p2.name));

  return (
    <div className="data-display">
      <h2>Hello, {name}!</h2>
      <div>
        <a href="#entry">Go to Page 1</a>
      </div>
      <table>
        <caption>Projects</caption>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        {sortedProjects.map((project: ProjectType) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.description}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

DataDisplay.propTypes = {
  name: t.string,
  projectMap: t.object,
};

export default DataDisplay;
