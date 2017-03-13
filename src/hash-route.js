// @flow

import URLSearchParams from 'url-search-params' // a polyfill for IE

type LocationType = {
  hash: string,
  pathname: string,
  search: Object
}

export function getLocationParts(loc: LocationType) {
  return {
    hash: loc.hash.substring(1),
    path: loc.pathname,
    query: new URLSearchParams(loc.search),
  }
}
