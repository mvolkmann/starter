import React from 'react';
import DateRange from '../../src/share/date-range';
import moment from 'moment';
import {shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';

// This cannot be tested like "normal" create components because
// it renders the date picker popup outside of the parent component,
// like a modal.
describe('DateRange', () => {
  it('should render', () => {
    const noop = () => null;
    const component = shallow(
      <DateRange className="form"
        endDate={moment().valueOf()}
        onEndDateChanged={noop}
        onStartDateChanged={noop}
        startDate={moment().valueOf()}
      />);

    expect(component.text()).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    /* eslint-disable no-empty-function */
    const startDate = moment();
    const endDate = moment();
    const onStartDateChanged = () => {};
    const onEndDateChanged = () => {};
    const jsx =
      <DateRange
        startDate={startDate.valueOf()}
        endDate={endDate.valueOf()}
        onStartDateChanged={onStartDateChanged}
        onEndDateChanged={onEndDateChanged}
      />;

    const renderer = TestUtils.createRenderer();
    renderer.render(jsx);
    const output = renderer.getRenderOutput();

    expect(output).toBeDefined();
    expect(output.type).toBe('span');

    const [startGroup, endGroup] = output.props.children;
    const [startLabel, startPicker] = startGroup.props.children;
    const [endLabel, endPicker] = endGroup.props.children;

    expect(startLabel.type).toBe('label');
    expect(startLabel.props.children).toBe('Start');

    expect(typeof startPicker.type).toBe('function');
    expect(startPicker.type.displayName).toBe('DatePicker');

    expect(endLabel.type).toBe('label');
    expect(endLabel.props.children).toBe('End');

    expect(typeof endPicker.type).toBe('function');
    expect(endPicker.type.displayName).toBe('DatePicker');

    const dateRange = TestUtils.renderIntoDocument(jsx);
    const inputs =
      TestUtils.scryRenderedDOMComponentsWithTag(dateRange, 'input');
    expect(inputs.length).toBe(2);
    const [startInput, endInput] = inputs;
    TestUtils.Simulate.click(startInput);
    TestUtils.Simulate.click(endInput);

    //TODO: This isn't finding the days on the picker.
    //const days = TestUtils.scryRenderedDOMComponentsWithClass(
    //  dateRange, 'react-datepicker__day');
    //console.log('date-range.jsx x: days =', days);
  });
});
