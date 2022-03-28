export type ThemeValue = number | string;

export type ThemePreset =
  | Array<ThemeValue>
  | Record<number | string, ThemeValue>;

export const defaultTheme = {
  radius: [0, 2, 4, 8, 12, 16],
  spacing: [0, 4, 8, 16, 24, 32, 48, 64, 128],
  fontSizes: [0, 12, 18, 24],
  fontWeights: [0, 100, 400, 700],
  opacities: [0, 0.5, 0.81, 1],
  colors: {
    primary: 'tomato',
    header: 'primary',
    'header:text': 'white',
    background: 'whitesmoke',
    'background:strong': 'white',
    'background:weak': 'gainsboro',
  },
  images: {},
  heights: [0],
  widths: [0],
};

export type Theme = Partial<{
  [key in keyof typeof defaultTheme]: ThemePreset;
}>;
