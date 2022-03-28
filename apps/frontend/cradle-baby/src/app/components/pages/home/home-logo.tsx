import styled from 'styled-components';
import { Blubber } from '@blubberfish/frontend/ui/components';
import {
  color,
  ColorProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';

const Container = styled.div<
  ColorProps & PaddingProps & RadiusProps & SizeProps
>`
  ${color}
  ${padding}
  ${radius}
  ${size}
`;

export const HomeLogo = () => (
  <Container bg="#fff3" rad="50%" w={256} h={256}>
    <Blubber.Baby />
  </Container>
);
