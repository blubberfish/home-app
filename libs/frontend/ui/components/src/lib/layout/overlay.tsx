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

export type ConstrainedLayoutProps = HTMLAttributes<HTMLDivElement> & {
  onClickOutside?: () => void;
  overlay?: {
    mask?: ColorProps;
    layout?: Omit<PositionProps, 'pos'>;
  };
};

export const ConstrainedLayout = ({
  children,
  onClickOutside,
  overlay,
  ...props
}: ConstrainedLayoutProps) => (
  <Container pos="fixed" posX={0} posY={0} {...props}>
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
