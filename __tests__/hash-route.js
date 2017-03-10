import {getLocationParts} from '../src/hash-route';

jest.mock('../src/hash-route', () => {
  const original = require.requireActual('../src/hash-route');
  return {
    ...original,
    getLocation: jest.fn(() => ({
      hash: '#abc', //'#' + hash,
      pathname: '/foo/bar/baz', //path,
      search: '?foo=1&bar=2' //query
    }))
  };
});

describe('hash-route', () => {
  it('getLocationParts should work', () => {
    const hash = 'abc';
    const pathname = '/foo/bar/baz';
    const search = '?foo=1&bar=2';
    const location = {hash: '#' + hash, pathname, search};

    const parts = getLocationParts(location);
    expect(parts.hash).toBe(hash);
    expect(parts.path).toBe(pathname);
    expect(parts.query.get('foo')).toBe('1');
    expect(parts.query.get('bar')).toBe('2');
  });
});
