'use strict';
'use babel';

var _format = require("./format");

let themes;
let uiThemes = [];
let previewThemes = [];
let syntaxThemes = [];

async function getThemes() {
  const themeManager = await inkdrop.themes;
  console.log(themeManager.getLoadedThemes());
  themes = themeManager.getLoadedThemeNames();
  uiThemes = themes.filter(e => {
    return e.match(/^.+\-(ui)$/);
  }).map(e => (0, _format.displayToInternal)(e));
  previewThemes = themes.filter(e => {
    return e.match(/^.+\-(preview)$/);
  }).map(e => (0, _format.displayToInternal)(e));
  syntaxThemes = themes.filter(e => {
    return e.match(/^.+\-(syntax)$/);
  }).map(e => (0, _format.displayToInternal)(e));
}

module.exports = {};
getThemes().then(() => {
  module.exports.config = {
    startLight: {
      title: 'Start time of the light theme (HH:MM format)',
      type: 'string',
      default: '07:00'
    },
    startDark: {
      title: 'Start time of the dark theme (HH:MM format)',
      type: 'string',
      default: '18:00'
    },
    lightUiTheme: {
      title: 'Light UI Theme',
      type: 'string',
      default: 'Default Light UI',
      enum: uiThemes
    },
    lightSyntaxTheme: {
      title: 'Light Syntax Theme',
      type: 'string',
      default: 'Default Light Syntax',
      enum: syntaxThemes
    },
    lightPreviewTheme: {
      title: 'Light Preview Theme',
      type: 'string',
      default: 'GitHub Preview',
      enum: previewThemes
    },
    darkUiTheme: {
      title: 'Dark UI Theme',
      type: 'string',
      default: 'Default Dark UI',
      enum: uiThemes
    },
    darkSyntaxTheme: {
      title: 'Dark Syntax Theme',
      type: 'string',
      default: 'Default Dark Syntax',
      enum: syntaxThemes
    },
    darkPreviewTheme: {
      title: 'Dark Preview Theme',
      type: 'string',
      default: 'GitHub Preview',
      enum: previewThemes
    }
  };

  module.exports.activate = () => {
    console.log(themes);
    console.log(uiThemes);
    console.log(previewThemes);
    console.log(syntaxThemes);
  };
});