import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Box, BoxStyleProps } from './base';

export type ContrainedBoxProps = ComponentPropsWithoutRef<'div'> &
  BoxStyleProps;

export const ContrainedBox = forwardRef<HTMLDivElement, ContrainedBoxProps>(
  (props, ref) => <Box ref={ref} marX="auto" w="100%" wMax="717px" {...props} />
);
