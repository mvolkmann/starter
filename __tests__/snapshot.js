import renderer from 'react-test-renderer';

export default component => {
  expect(renderer.create(component).toJSON()).toMatchSnapshot();
};

// This line is here to prevent Jest from saying
// "Your test suite must contain at least one test."
// eslint-disable-next-line no-empty-function
it('is not a test', () => {});
