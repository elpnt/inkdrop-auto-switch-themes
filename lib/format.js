"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports.displayToInternal = displayToInternal;
exports.internalToDisplay = internalToDisplay;

function capitalize(s) {
  if (s === 'ui') {
    return 'UI';
  } else if (s === 'github') {
    return 'GitHub';
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
}

function displayToInternal(s) {
  return s.split('-').map(e => capitalize(e)).join(' ');
}

function internalToDisplay(s) {
  return s.split(' ').map(e => e.toLowerCase()).join('-');
}