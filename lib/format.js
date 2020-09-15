"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.internalToDisplay = internalToDisplay;
exports.displayToInternal = displayToInternal;

function capitalize(s) {
  if (s === 'ui') {
    return 'UI';
  } else if (s === 'github') {
    return 'GitHub';
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
}
/**
 *
 * Convert the Inkdrop internal theme name to the display name
 * eg: 'default-light-syntax' -> 'Default Light Syntax'
 *
 */


function internalToDisplay(s) {
  return s.split('-').map(e => capitalize(e)).join(' ');
}
/**
 *
 * Convert the Inkdrop display theme name to the display name
 * eg: 'Default Light Syntax' -> 'default-light-syntax'
 *
 */


function displayToInternal(s) {
  return s.split(' ').map(e => e.toLowerCase()).join('-');
}