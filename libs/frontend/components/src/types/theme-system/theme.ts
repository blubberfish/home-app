export type ThemeCssValue = number | string;

export type ThemeValue =
  | Record<number | string, ThemeCssValue>
  | ThemeCssValue[];

export type Theme = {
  breakpoints?: ThemeValue;
  colors?: ThemeValue;
  opacities?: ThemeValue;
  radii?: ThemeValue;
  sizes?: ThemeValue;
  spacings?: ThemeValue;
  fontFamilies?: ThemeValue;
  fontSizes?: ThemeValue;
  fontWeights?: ThemeValue;
};
