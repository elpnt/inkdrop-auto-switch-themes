'use babel';

import { getLoadedThemeDisplayNames, getThemesByMode } from './themes';
import { remote } from 'electron';

const { nativeTheme } = remote;
module.exports = {};

getLoadedThemeDisplayNames().then(([uiThemes, previewThemes, syntaxThemes]) => {
  module.exports.config = {
    lightUiTheme: {
      title: 'Light UI Theme',
      type: 'string',
      default: 'Default Light UI',
      enum: uiThemes,
    },
    lightSyntaxTheme: {
      title: 'Light Syntax Theme',
      type: 'string',
      default: 'Default Light Syntax',
      enum: syntaxThemes,
    },
    lightPreviewTheme: {
      title: 'Light Preview Theme',
      type: 'string',
      default: 'GitHub Preview',
      enum: previewThemes,
    },
    darkUiTheme: {
      title: 'Dark UI Theme',
      type: 'string',
      default: 'Default Dark UI',
      enum: uiThemes,
    },
    darkSyntaxTheme: {
      title: 'Dark Syntax Theme',
      type: 'string',
      default: 'Default Dark Syntax',
      enum: syntaxThemes,
    },
    darkPreviewTheme: {
      title: 'Dark Preview Theme',
      type: 'string',
      default: 'GitHub Preview',
      enum: previewThemes,
    },
  };

  module.exports.activate = () => {
    const lightThemes = getThemesByMode('light');
    const darkThemes = getThemesByMode('dark');

    function switchTheme() {
      if (nativeTheme.shouldUseDarkColors) {
        inkdrop.config.set('core.themes', darkThemes);
      } else {
        inkdrop.config.set('core.themes', lightThemes);
      }
    }

    // Switch the theme when Inkdrop is launched
    switchTheme();

    // Listen for the system's dark mode setting event
    nativeTheme.on('updated', () => {
      switchTheme();
    });
  };
});
