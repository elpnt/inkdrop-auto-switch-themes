function capitalize(s: string): string {
  if (s === 'ui') {
    return 'UI';
  } else if (s === 'github') {
    return 'GitHub';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function displayToInternal(s: string) {
  return s
    .split('-')
    .map((e: string) => capitalize(e))
    .join(' ');
}

function internalToDisplay(s: string): string {
  return s
    .split(' ')
    .map((e: string) => e.toLowerCase())
    .join('-');
}

export { capitalize, displayToInternal, internalToDisplay };
