import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  SizeProps,
  size,
  PaddingProps,
  padding,
  MarginProps,
  margin,
  ColorProps,
  color,
} from '@blubberfish/style-system';

const Container = styled.div<
  SizeProps & PaddingProps & MarginProps & ColorProps
>`
  ${size}
  ${padding}
  ${margin}
  ${color}
`;

export type ConstrainedLayoutProps = HTMLAttributes<HTMLDivElement>;

export const ConstrainedLayout = (props: ConstrainedLayoutProps) => (
  <Container marX="auto" w="100%" wMax="313px" {...props} />
);
