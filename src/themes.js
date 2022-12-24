import { displayToInternal, internalToDisplay } from "./format";

export function getThemesByMode(mode) {
  let ui = inkdrop.config.get("auto-switch-themes." + mode + "Ui");
  let syntax = inkdrop.config.get("auto-switch-themes." + mode + "Syntax");
  let preview = inkdrop.config.get("auto-switch-themes." + mode + "Preview");
  return [ui, syntax, preview].map((e) => displayToInternal(e));
}

export async function getLoadedThemeDisplayNames() {
  let themes = [];
  let ui = [];
  let syntax = [];
  let preview = [];

  const themeManager = await inkdrop.themes;
  themes = themeManager.getLoadedThemeNames();

  ui = themes
    .filter((e) => e.match(/^.+\-(ui)$/))
    .map((e) => internalToDisplay(e));
  syntax = themes
    .filter((e) => e.match(/^.+\-(syntax)$/))
    .map((e) => internalToDisplay(e));
  preview = themes
    .filter((e) => e.match(/^.+\-(preview)$/))
    .map((e) => internalToDisplay(e));

  return [ui, syntax, preview];
}
