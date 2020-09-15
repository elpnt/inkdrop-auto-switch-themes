"use strict";
'use babel';

var _themes = require("./themes");

var _electron = require("electron");

const {
  nativeTheme
} = _electron.remote;
module.exports = {};
(0, _themes.getLoadedThemeDisplayNames)().then(([uiThemes, previewThemes, syntaxThemes]) => {
  module.exports.config = {
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
    const lightThemes = (0, _themes.getThemesByMode)('light');
    const darkThemes = (0, _themes.getThemesByMode)('dark');

    function switchTheme() {
      if (nativeTheme.shouldUseDarkColors) {
        inkdrop.config.set('core.themes', darkThemes);
      } else {
        inkdrop.config.set('core.themes', lightThemes);
      }
    } // Switch the theme when Inkdrop is launched


    switchTheme(); // Listen for the system's dark mode setting event

    nativeTheme.on('updated', () => {
      switchTheme();
    });
  };
});