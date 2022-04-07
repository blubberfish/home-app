import { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { color, ColorProps, font, FontProps } from '@blubberfish/style-system';
import { scales } from './gradient';

const GlobalStyle = createGlobalStyle<ColorProps & FontProps>`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    ${font}
    ${color}
  }
  svg {
    vertical-align: middle;
  }
`;

export type ThemeProps = {
  children?: ReactNode;
};

export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider
    theme={{
      images: {
        home: '/assets/img/accent-background.jpg',
        gradient_scales: scales('#358', '#333'),
      },
    }}
  >
    <GlobalStyle bg="background" fg="text" ft="sans-serif" ftSize={2} />
    {children}
  </ThemeProvider>
);
