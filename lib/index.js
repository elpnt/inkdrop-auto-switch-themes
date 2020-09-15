"use strict";
'use babel';

var _format = require("./format");

var _themes = require("./themes");

var _electron = require("electron");

const {
  nativeTheme
} = _electron.remote;
module.exports = {};
(0, _themes.getLoadedThemeDisplayNames)().then(([uiThemes, syntaxThemes, previewThemes]) => {
  module.exports.config = {
    lightUi: {
      title: 'Light UI Theme',
      type: 'string',
      default: 'Default Light UI',
      enum: uiThemes
    },
    lightSyntax: {
      title: 'Light Syntax Theme',
      type: 'string',
      default: 'Default Light Syntax',
      enum: syntaxThemes
    },
    lightPreview: {
      title: 'Light Preview Theme',
      type: 'string',
      default: 'GitHub Preview',
      enum: previewThemes
    },
    darkUi: {
      title: 'Dark UI Theme',
      type: 'string',
      default: 'Default Dark UI',
      enum: uiThemes
    },
    darkSyntax: {
      title: 'Dark Syntax Theme',
      type: 'string',
      default: 'Default Dark Syntax',
      enum: syntaxThemes
    },
    darkPreview: {
      title: 'Dark Preview Theme',
      type: 'string',
      default: 'GitHub Preview',
      enum: previewThemes
    }
  };

  module.exports.activate = () => {
    function switchTheme() {
      const lightThemes = (0, _themes.getThemesByMode)('light');
      const darkThemes = (0, _themes.getThemesByMode)('dark');

      if (nativeTheme.shouldUseDarkColors) {
        inkdrop.config.set('core.themes', darkThemes);
      } else {
        inkdrop.config.set('core.themes', lightThemes);
      }
    } // Switch the theme when Inkdrop is launched


    switchTheme(); // Listen for the system's dark mode setting event

    nativeTheme.on('updated', () => {
      switchTheme();
    }); // When the plugin config is changed reflect it

    inkdrop.config.onDidChange('auto-switch-themes', ({
      newValue,
      oldValue
    }) => {
      switchTheme();
    });

    function setPluginConfigFromGlobal(newTheme, mode) {
      if (newTheme.match(/^.+\-(ui)$/)) {
        inkdrop.config.set('auto-switch-themes.' + mode + 'Ui', (0, _format.internalToDisplay)(newTheme));
      }

      if (newTheme.match(/^.+\-(syntax)$/)) {
        inkdrop.config.set('auto-switch-themes.' + mode + 'Syntax', (0, _format.internalToDisplay)(newTheme));
      }

      if (newTheme.match(/^.+\-(preview)$/)) {
        inkdrop.config.set('auto-switch-themes.' + mode + 'Preview', (0, _format.internalToDisplay)(newTheme));
      }
    } // When the theme is changed from 'Preferences > Themes',
    // also change the plugin config


    inkdrop.config.onDidChange('core.themes', ({
      newValue,
      oldValue
    }) => {
      const newTheme = newValue[2];

      if (nativeTheme.shouldUseDarkColors) {
        setPluginConfigFromGlobal(newTheme, 'dark');
      } else {
        setPluginConfigFromGlobal(newTheme, 'light');
      }
    });
  };
});