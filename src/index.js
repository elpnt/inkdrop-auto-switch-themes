import { internalToDisplay } from "./format";
import { getLoadedThemeDisplayNames, getThemesByMode } from "./themes";
import { nativeTheme } from "@electron/remote";

module.exports = {};

getLoadedThemeDisplayNames().then(([uiThemes, syntaxThemes, previewThemes]) => {
  module.exports.config = {
    lightUi: {
      title: "Light UI Theme",
      type: "string",
      default: "Default Light UI",
      enum: uiThemes,
    },
    lightSyntax: {
      title: "Light Syntax Theme",
      type: "string",
      default: "Default Light Syntax",
      enum: syntaxThemes,
    },
    lightPreview: {
      title: "Light Preview Theme",
      type: "string",
      default: "GitHub Preview",
      enum: previewThemes,
    },
    darkUi: {
      title: "Dark UI Theme",
      type: "string",
      default: "Default Dark UI",
      enum: uiThemes,
    },
    darkSyntax: {
      title: "Dark Syntax Theme",
      type: "string",
      default: "Default Dark Syntax",
      enum: syntaxThemes,
    },
    darkPreview: {
      title: "Dark Preview Theme",
      type: "string",
      default: "GitHub Preview",
      enum: previewThemes,
    },
  };

  module.exports.activate = () => {
    function switchTheme() {
      const lightThemes = getThemesByMode("light");
      const darkThemes = getThemesByMode("dark");
      if (nativeTheme.shouldUseDarkColors) {
        inkdrop.config.set("core.themes", darkThemes);
      } else {
        inkdrop.config.set("core.themes", lightThemes);
      }
    }

    // Switch the theme when Inkdrop is launched
    switchTheme();
    // Listen for the system's dark mode setting event
    nativeTheme.on("updated", () => {
      switchTheme();
    });

    // When the plugin config is changed reflect it
    inkdrop.config.onDidChange(
      "auto-switch-themes",
      ({ newValue, oldValue }) => {
        switchTheme();
      }
    );

    function setPluginConfigFromGlobal(newTheme, mode) {
      if (newTheme.match(/^.+\-(ui)$/)) {
        inkdrop.config.set(
          "auto-switch-themes." + mode + "Ui",
          internalToDisplay(newTheme)
        );
      }
      if (newTheme.match(/^.+\-(syntax)$/)) {
        inkdrop.config.set(
          "auto-switch-themes." + mode + "Syntax",
          internalToDisplay(newTheme)
        );
      }
      if (newTheme.match(/^.+\-(preview)$/)) {
        inkdrop.config.set(
          "auto-switch-themes." + mode + "Preview",
          internalToDisplay(newTheme)
        );
      }
    }

    // When the theme is changed from 'Preferences > Themes',
    // also change the plugin config
    inkdrop.config.onDidChange("core.themes", ({ newValue, oldValue }) => {
      const newTheme = newValue[2];
      if (nativeTheme.shouldUseDarkColors) {
        setPluginConfigFromGlobal(newTheme, "dark");
      } else {
        setPluginConfigFromGlobal(newTheme, "light");
      }
    });
  };
});
