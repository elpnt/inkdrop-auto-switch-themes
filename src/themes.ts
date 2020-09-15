'use babel';

import { displayToInternal, internalToDisplay } from './format';

export function getThemesByMode(mode: Mode): string[] {
  let ui = inkdrop.config.get('auto-switch-themes.' + mode + 'UiTheme');
  let preview = inkdrop.config.get(
    'auto-switch-themes.' + mode + 'PreviewTheme'
  );
  let syntax = inkdrop.config.get('auto-switch-themes.' + mode + 'SyntaxTheme');
  return [ui, preview, syntax].map((e) => displayToInternal(e));
}

export async function getLoadedThemeDisplayNames(): Promise<string[][]> {
  let themes: string[];
  let uiThemes: string[] = [];
  let previewThemes: string[] = [];
  let syntaxThemes: string[] = [];

  const themeManager = await inkdrop.themes;
  themes = themeManager.getLoadedThemeNames();

  uiThemes = themes
    .filter((e) => e.match(/^.+\-(ui)$/))
    .map((e) => internalToDisplay(e));

  previewThemes = themes
    .filter((e) => e.match(/^.+\-(preview)$/))
    .map((e) => internalToDisplay(e));

  syntaxThemes = themes
    .filter((e) => e.match(/^.+\-(syntax)$/))
    .map((e) => internalToDisplay(e));

  return [uiThemes, previewThemes, syntaxThemes];
}
