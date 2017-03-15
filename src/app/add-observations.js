import React, {Component, PropTypes as t} from 'react';
import {BootstrapTable, TableHeaderColumn} from '@monsantoit/react-bootstrap-table';

class AddObservations extends Component {
  static propTypes = {
  };

  /*
  onSomeEvent = event => {
  };
  */

  constructor() {
    super();

    this.observations = [
      {
        name: 'AFW',
        weight: 0.25,
        brTarget: 225,
        antebellumTarget: 225,
        advancementTargets: [200, 198, 205]
      },
      {
        name: 'FINAL',
        weight: 0.05,
        brTarget: 4,
        antebellumTarget: 4,
        advancementTargets: [4, 4, 4]
      }
    ];
  }

  render() {
    return (
      <BootstrapTable data={this.observations}>
        <TableHeaderColumn dataField="name" isKey>
          Observation
        </TableHeaderColumn>
        <TableHeaderColumn dataField="weight">
          Attribute Weight
        </TableHeaderColumn>
        <TableHeaderColumn dataField="brTarget">
          BR Target
        </TableHeaderColumn>
        <TableHeaderColumn dataField="antebellumTarget">
          Antebellum
        </TableHeaderColumn>
        <TableHeaderColumn dataField="antebellumAdvancementTarget">
          Antebellum
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default AddObservations;
