export let setState;

export function defineSetState(thing) {
  setState = typeof thing === 'function' ? thing : thing.setState.bind(thing);
}
