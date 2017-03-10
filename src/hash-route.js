// @flow

import URLSearchParams from 'url-search-params'; // a polyfill for IE

export function getLocationParts(loc) {
  return {
    hash: loc.hash.substring(1),
    path: loc.pathname,
    query: new URLSearchParams(loc.search),
  };
}
