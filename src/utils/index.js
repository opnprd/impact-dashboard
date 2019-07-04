export function byCapital(capital) {
  return _ => _.capital === capital;
}

export function goTo(path) {
  window.location = `#${path}`;
}

export function createKeydownHandler(options) {
  const { actions = {} } = options;

  return (e) => {
    const action = actions[e.key.toLowerCase()];
    if (action !== undefined) action();
  };
}
