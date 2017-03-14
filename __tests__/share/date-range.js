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
        endDate={moment()}
        onEndDateChanged={noop}
        onStartDateChanged={noop}
        startDate={moment()}
      />);

    expect(component.text()).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    const date = moment().year(2017).month(2).date(14)
      .hour(0).minute(0).second(0).millisecond(0);
    /* eslint-disable no-empty-function */
    const startDate = date;
    const endDate = date;
    const onStartDateChanged = () => {};
    const onEndDateChanged = () => {};
    const jsx =
      <DateRange
        startDate={startDate}
        endDate={endDate}
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
