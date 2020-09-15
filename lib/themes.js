"use strict";
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemesByMode = getThemesByMode;
exports.getLoadedThemeDisplayNames = getLoadedThemeDisplayNames;

var _format = require("./format");

function getThemesByMode(mode) {
  let ui = inkdrop.config.get('auto-switch-themes.' + mode + 'Ui');
  let syntax = inkdrop.config.get('auto-switch-themes.' + mode + 'Syntax');
  let preview = inkdrop.config.get('auto-switch-themes.' + mode + 'Preview');
  return [ui, syntax, preview].map(e => (0, _format.displayToInternal)(e));
}

async function getLoadedThemeDisplayNames() {
  let themes = [];
  let ui = [];
  let syntax = [];
  let preview = [];
  const themeManager = await inkdrop.themes;
  themes = themeManager.getLoadedThemeNames();
  ui = themes.filter(e => e.match(/^.+\-(ui)$/)).map(e => (0, _format.internalToDisplay)(e));
  syntax = themes.filter(e => e.match(/^.+\-(syntax)$/)).map(e => (0, _format.internalToDisplay)(e));
  preview = themes.filter(e => e.match(/^.+\-(preview)$/)).map(e => (0, _format.internalToDisplay)(e));
  return [ui, syntax, preview];
}