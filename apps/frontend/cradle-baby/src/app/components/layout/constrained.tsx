import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  SizeProps,
  size,
  MarginProps,
  margin,
} from '@blubberfish/style-system';

const Container = styled.div<SizeProps & MarginProps>`
  ${size}
  ${margin}
`;

export type ConstrainedLayoutProps = HTMLAttributes<HTMLDivElement>;

export const ConstrainedLayout = (props: ConstrainedLayoutProps) => (
  <Container marX="auto" w="100%" wMax="1024px" {...props} />
);
