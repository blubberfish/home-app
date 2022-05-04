import { ThemePreset } from './theme';

export const asCssValue = (value: string | number) =>
  typeof value === 'number' ? `${value}px` : value;

export const resolve = (
  value: number | string,
  theme: ThemePreset,
  depth = 1
): string => {
  if (Array.isArray(theme)) {
    return asCssValue(
      (typeof value !== 'number' ? value : theme[value]) ?? value
    );
  }

  const resolved = theme[value];
  if (resolved) {
    if (depth > 0) {
      return resolve(resolved, theme, depth - 1);
    }
    return asCssValue(resolved);
  }

  return asCssValue(value);
};
