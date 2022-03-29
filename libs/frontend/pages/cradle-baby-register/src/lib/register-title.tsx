import styled from 'styled-components';
import { color, ColorProps, font, FontProps } from '@blubberfish/style-system';

const Title = styled.h1<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

export const RegisterTitle = () => (
  <Title fg="text_invert_strong" ftSize={4} ftWeight={3}>
    Create a new account
  </Title>
);
