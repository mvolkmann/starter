import React from 'react';
import App from '../../src/app/app';
import {shallowSnapshot} from '../snapshot';

describe('App', () => {
  it('should render', () => {
    shallowSnapshot(<App />);
  });
});
