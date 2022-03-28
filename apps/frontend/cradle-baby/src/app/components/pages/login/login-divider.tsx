import styled from 'styled-components';
import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  font,
  FontProps,
  grid,
  GridProps,
} from '@blubberfish/style-system';

const Container = styled.div<AlignmentProps & ColorProps & GridProps>`
  ${alignment}
  ${color}
  ${grid}

  hr {
    color: currentColor;
    background-color: currentColor;
    border-color: currentColor;
    width: 100%;
  }
`;

const Text = styled.span<FontProps>`
  ${font}
`;

export const LoginDivider = () => (
  <Container
    fg="#000a"
    templateColumns="1fr max-content 1fr"
    gap={3}
    alignItems="center"
  >
    <hr />
    <Text ftSize={1} ftWeight={3}>
      New here?
    </Text>
    <hr />
  </Container>
);
