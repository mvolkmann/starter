import {defineSetState} from '../../src/util/state-util';
import {handleError} from '../../src/util/error';

let state;
defineSetState(s => state = s);

describe('error', () => {
  it('handleError should work', () => {
    const message = 'something bad happened';
    handleError('some-url', {message});
    expect(state).toEqual({error: message});
  });
});
