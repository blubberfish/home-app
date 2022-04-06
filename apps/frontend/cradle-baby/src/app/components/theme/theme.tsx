import { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { font, FontProps } from '@blubberfish/style-system';
import { scales } from './gradient';

const GlobalStyle = createGlobalStyle<FontProps>`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    ${font}
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
    <GlobalStyle ft="sans-serif" ftSize={2} />
    {children}
  </ThemeProvider>
);
