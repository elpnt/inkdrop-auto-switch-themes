"use strict";
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemesByMode = getThemesByMode;
exports.getLoadedThemeDisplayNames = getLoadedThemeDisplayNames;

var _format = require("./format");

function getThemesByMode(mode) {
  let ui = inkdrop.config.get('auto-switch-themes.' + mode + 'UiTheme');
  let preview = inkdrop.config.get('auto-switch-themes.' + mode + 'PreviewTheme');
  let syntax = inkdrop.config.get('auto-switch-themes.' + mode + 'SyntaxTheme');
  return [ui, preview, syntax].map(e => (0, _format.displayToInternal)(e));
}

async function getLoadedThemeDisplayNames() {
  let themes = [];
  let uiThemes = [];
  let previewThemes = [];
  let syntaxThemes = [];
  const themeManager = await inkdrop.themes;
  themes = themeManager.getLoadedThemeNames();
  uiThemes = themes.filter(e => e.match(/^.+\-(ui)$/)).map(e => (0, _format.internalToDisplay)(e));
  previewThemes = themes.filter(e => e.match(/^.+\-(preview)$/)).map(e => (0, _format.internalToDisplay)(e));
  syntaxThemes = themes.filter(e => e.match(/^.+\-(syntax)$/)).map(e => (0, _format.internalToDisplay)(e));
  return [uiThemes, previewThemes, syntaxThemes];
}