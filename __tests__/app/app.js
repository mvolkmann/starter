import React from 'react';
import App from '../../src/app/app';
import moment from 'moment';
import {shallowSnapshot} from '../snapshot';

describe('App', () => {
  it('should render', () => {
    const ms = 1489530013846; // March 14, 2017 5:20PM
    const date = moment(ms);
    shallowSnapshot(<App date={date} />);
  });
});
