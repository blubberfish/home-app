import { Box, Grid } from '@blubberfish/frontend/ui/components';

export const HeroHead = () => (
  <Grid
    bg="#0008"
    grid={{
      autoColumns: 'max-content',
      autoFlow: 'column',
      templateRows: 'min-content',
      alignContent: 'center',
      justifyContent: 'space-between',
    }}
    px={5}
    py={3}
  >
    <Box h={24} w={24} bg="#0003" radius={{ all: '50%' }} />
    <Grid
      grid={{
        alignContent: 'center',
        autoColumns: 'max-content',
        autoFlow: 'column',
        gap: 3,
        templateRows: 'min-content',
      }}
    >
      <a href="/login">Sign In</a>
      <a href="/register">Register</a>
    </Grid>
  </Grid>
);
