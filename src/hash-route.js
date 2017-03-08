// @flow

import URLSearchParams from 'url-search-params' // a polyfill for IE

export function getLocationParts() {
  return {
    hash: location.hash.substring(1),
    path: location.pathname,
    query: new URLSearchParams(location.search),
  }
}
