export let setState;

export function defineSetState(component) {
  setState = component.setState.bind(component);
}
