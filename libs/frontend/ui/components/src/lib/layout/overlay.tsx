import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  ColorProps,
  color,
  PositionProps,
  position,
  SizeProps,
  size,
} from '@blubberfish/style-system';

const Container = styled.div<ColorProps & PositionProps & SizeProps>`
  ${color}
  ${position}
  ${size}
`;

export type OverlayLayoutProps = HTMLAttributes<HTMLDivElement> & {
  onClickOutside?: () => void;
  overlay?: {
    mask?: ColorProps;
    layout?: Omit<PositionProps, 'pos'>;
  };
};

export const OverlayLayout = ({
  children,
  onClickOutside,
  overlay,
  ...props
}: OverlayLayoutProps) => (
  <Container pos="fixed" posX={0} posY={0} z={2} {...props}>
    <Container
      pos="relative"
      posX={0}
      posY={0}
      onClick={onClickOutside}
      {...overlay?.mask}
    />
    <Container pos="absolute" {...overlay?.layout}>
      {children}
    </Container>
  </Container>
);
