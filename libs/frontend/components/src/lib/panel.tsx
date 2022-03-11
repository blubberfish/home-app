import { Box, BoxProps } from './box';

export const Panel = (props: BoxProps) => (
  <Box bg="background.0" p={3} borderRadius={3} {...props} />
);
