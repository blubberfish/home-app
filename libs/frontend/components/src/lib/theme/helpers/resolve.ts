import { ThemeValue, ThemeCssValue } from '../../../types';

export const resolve = (
  value: number | string,
  theme?: ThemeValue,
  depth = 2
): ThemeCssValue => {
  if (!theme) return value;
  if (Array.isArray(theme)) {
    switch (typeof value) {
      case 'number':
        return theme[value] ?? value;
      default:
        return value;
    }
  }
  const resolved = theme[value];
  if (resolved) {
    if (depth > 0) {
      return resolve(value, theme, depth - 1);
    }
    return resolved;
  }
  return value;
};
