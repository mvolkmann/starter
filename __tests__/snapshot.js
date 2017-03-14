import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

export function shallowSnapshot(component) {
  expect(shallow(component)).toMatchSnapshot();
}

export default function snapshot(component) {
  expect(renderer.create(component).toJSON()).toMatchSnapshot();
}

// This line is here to prevent Jest from saying
// "Your test suite must contain at least one test."
// eslint-disable-next-line no-empty-function
it('is not a test', () => {});
