import { Box, Grid } from '@blubberfish/frontend/components';

export const HeroBody = () => (
  <Grid
    grid={{ templateColumns: '1fr', templateRows: '1fr' }}
    minH={568}
    px={3}
    py={64}
  >
    <Box w={128} h={128} bg="#0003" radius={{ all: '50%' }} />
  </Grid>
);
