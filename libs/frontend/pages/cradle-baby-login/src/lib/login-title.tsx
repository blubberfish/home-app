import styled from 'styled-components';
import { color, ColorProps, font, FontProps } from '@blubberfish/style-system';

const Title = styled.h1<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

export const LoginTitle = () => (
  <Title fg="text_invert_strong" ftAlign="center" ftSize={4} ftWeight={3}>
    Login
  </Title>
);
