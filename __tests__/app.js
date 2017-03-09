import React from 'react';
import App from '../src/app';
import snapshot from './snapshot';

describe('App', () => {
  it('should render', () => {
    snapshot(<App />);
  });
});
