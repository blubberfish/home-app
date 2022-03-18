import { Box, Grid } from '@blubberfish/frontend/components';

export const HeroBody = () => (
  <Grid
    grid={{
      templateColumns: '1fr',
      templateRows: '1fr',
      alignItems: 'center',
      justifyItems: 'center',
    }}
    minH={568}
    px={5}
    py={6}
  >
    <Box w={128} h={128} bg="#0003" radius={{ all: '50%' }} />
  </Grid>
);
