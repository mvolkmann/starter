import React, {Component, PropTypes as t} from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './date-range.css';

class DateRange extends Component {
  static displayName = 'DateRange';

  static propTypes = {
    className: t.string,
    endDate: t.number.isRequired,
    onEndDateChanged: t.func.isRequired,
    onStartDateChanged: t.func.isRequired,
    startDate: t.number.isRequired
  };

  isValidStart = startDate => moment(startDate).isBefore(this.props.endDate);
  isValidEnd = endDate => moment(endDate).isAfter(this.props.startDate);

  render() {
    const today = moment().valueOf();
    const {
      className = '', endDate = today, startDate = today
      , onEndDateChanged, onStartDateChanged
    } = this.props;

    const props = {
      endDate: moment(endDate),
      showMonthDropdown: true,
      showYearDropdown: true,
      startDate: moment(startDate)
    };

    const style = {
      display: 'inline-block',
      marginRight: '10px',
      width: '100px'
    };

    // sr-only is a Bootstrap class that means "screen reader only".
    // It hides the element on which it is applied.
    return (
      <span className={className}>
        <span style={style}>
          <label className="sr-only control-label"
            htmlFor="start-date-picker"
          >
            Start
          </label>
          <DatePicker
            {...props}
            id="start-date-picker"
            className="form-control"
            filterDate={this.isValidStart}
            onChange={onStartDateChanged}
            selected={moment(startDate)}
            selectsStart
          />
        </span>

        <span style={style}>
          <label className="sr-only control-label"
            htmlFor="end-date-picker"
          >
            End
          </label>
          <DatePicker
            {...props}
            id="end-date-picker"
            className="form-control"
            filterDate={this.isValidEnd}
            onChange={onEndDateChanged}
            selected={moment(endDate)}
            selectsEnd
          />
        </span>
      </span>
    );
  }
}

export default DateRange;
