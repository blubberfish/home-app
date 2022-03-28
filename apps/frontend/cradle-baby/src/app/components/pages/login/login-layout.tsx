import { ReactNode } from 'react';
import styled from 'styled-components';
import {
  alignment,
  AlignmentProps,
  border,
  BorderProps,
  color,
  ColorProps,
  grid,
  GridProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';

const Container = styled.div<
  AlignmentProps &
    BorderProps &
    ColorProps &
    GridProps &
    MarginProps &
    PaddingProps &
    SizeProps
>`
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${size}
`;

export type HomePageLayoutProps = {
  children: ReactNode;
};

export const LoginLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <Container
      bg="background_invert"
      w="100%"
      h="100vh"
      overflow="hidden"
      templateColumns="1fr"
      templateRows="1fr"
    >
      <Container
        w="100%"
        wMax="717px"
        marX="auto"
        templateColumns="1fr"
        autoRows="min-content"
        autoFlow="row"
        gap={5}
        alignContent="center"
      >
        {children}
      </Container>
    </Container>
  );
};
