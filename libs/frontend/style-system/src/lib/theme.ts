export type ThemeValue = number | string;

export type ThemePreset =
  | Array<ThemeValue>
  | Record<number | string, ThemeValue>;

export const defaultTheme = {
  radii: [0, 2, 4, 8, 12, 16],
  spacing: [0, 4, 8, 16, 24, 32, 48, 64, 128],
  fontSizes: [0, 12, 18, 24, 32, 48, 64],
  fontWeights: ['0', '100', '400', '700'],
  opacities: ['0', '0.5', '0.81', '1'],
  layers: ['0', '1', '99'],
  colors: {
    primary: 'steelblue',
    primary_light: 'lightsteelblue',
    background: '#222',
    background_strong: '#111',
    background_weak: '#333',
    text: '#eee',
    text_weak: '#ccc',
    text_strong: 'white',
    background_invert: 'whitesmoke',
    background_invert_strong: 'white',
    background_invert_weak: 'gainsboro',
    text_invert: '#222',
    text_invert_weak: '#444',
    text_invert_strong: 'black',
    error: 'crimson',
    error_accent: 'lavenderblush',
    success: 'forestgreen',
    success_accent: 'honeydew',
  },
  images: {},
  heights: [0],
  widths: [0],
};

export type Theme = Partial<{
  [key in keyof typeof defaultTheme]: ThemePreset;
}>;
