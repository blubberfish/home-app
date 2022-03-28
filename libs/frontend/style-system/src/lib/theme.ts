export type ThemeValue = number | string;

export type ThemePreset =
  | Array<ThemeValue>
  | Record<number | string, ThemeValue>;

export const defaultTheme = {
  radius: [0, 2, 4, 8, 12, 16],
  spacing: [0, 4, 8, 16, 24, 32, 48, 64, 128],
  fontSizes: [0, 12, 18, 24],
  fontWeights: ['0', '100', '400', '700'],
  opacities: ['0', '0.5', '0.81', '1'],
  layers: ['0', '1', '99'],
  colors: {
    primary: 'steelblue',
    primary_light: 'lightsteelblue',
    header: 'primary_light',
    header_text: 'white',
    background: 'whitesmoke',
    background_strong: 'white',
    background_weak: 'gainsboro',
  },
  images: {},
  heights: [0],
  widths: [0],
};

export type Theme = Partial<{
  [key in keyof typeof defaultTheme]: ThemePreset;
}>;
