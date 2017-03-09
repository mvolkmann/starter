import {handleError} from '../src/error';

let state;
window.setState = s => state = s;

describe('error', () => {
  it('handleError should work', () => {
    const message = 'something bad happened';
    handleError('some-url', {message});
    expect(state).toEqual({error: message});
  });
});
