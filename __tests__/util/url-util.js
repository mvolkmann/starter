import {getUrl} from '../../src/util/url-util';

describe('getUrl', () => {
  it('should work', () => {
    expect(getUrl('foo')).toBe('https://localhost/foo');

    expect(getUrl('foo', {bar: 1}))
      .toBe('https://localhost/foo?bar=1');

    expect(getUrl('foo', {bar: 1, baz: 'qux'}))
      .toBe('https://localhost/foo?bar=1&baz=qux');

    expect(getUrl('foo', {c: 1, b: 2, a: 3}))
      .toBe('https://localhost/foo?a=3&b=2&c=1');
  });
});
