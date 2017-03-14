export let setState;

/**
 * This sets `setState` to a function that
 * components use to change the app state.
 * Typically the top component will be passed
 * to this so its state will be used.
 * For tests it is useful to pass a function
 * so assertions about state changes can be made.
 */
export function defineSetState(thing) {
  setState = typeof thing === 'function' ? thing : thing.setState.bind(thing);
}
