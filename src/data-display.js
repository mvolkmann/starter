// @flow
import React, {Component, PropTypes as t} from 'react';
import {handleError} from './error';
import 'whatwg-fetch'; //TODO: Is this needed?

type ProjectType = {
  id: number,
  name: string,
  description: string
};

type ProjectMapType = {
  [id: string]: ProjectType
};

async function deleteProject(id: number) {
  const restUrl = 'https://localhost';
  const url = `${restUrl}/project/${id}`;
  try {
    const res = await fetch(url, {method: 'DELETE'});
    if (res.ok) {
      window.setState(state => {
        const {projectMap} = state;
        delete projectMap[id];
        return {projectMap};
      });
    } else {
      handleError(url, res);
    }
  } catch (e) {
    handleError.bind(null, url);
  }
}

class DataDisplay extends Component {
  static propTypes = {
    projectMap: t.object.isRequired,
  };

  props: {
    projectMap: ProjectMapType
  };

  onDelete = (projectId: number) => deleteProject(projectId);

  render() {
    const {projectMap} = this.props;

    const sortedProjects = Object.keys(projectMap)
      .map(projectId => projectMap[projectId])
      .sort((p1: ProjectType, p2: ProjectType) =>
        p1.name.localeCompare(p2.name));

    return (
      <div className="data-display">
        <table>
          <caption>Projects</caption>
          <tbody>
            <tr>
              <th />
              <th>Name</th>
              <th>Description</th>
            </tr>
            {sortedProjects.map((project: ProjectType) => (
              <tr key={project.id}>
                <td>
                  <button onClick={() => this.onDelete(project.id)}>
                    Delete
                  </button>
                </td>
                <td>{project.name}</td>
                <td>{project.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <a href="#entry">Go to Page 1</a>
      </div>
    );
  }
}

export default DataDisplay;
