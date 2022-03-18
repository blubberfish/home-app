import { Box, Grid } from '@blubberfish/frontend/components';

export const HeroHead = () => (
  <Grid
    grid={{ templateColumns: '1fr max-content', templateRows: 'min-content' }}
    px={3}
    py={2}
  >
    <Box />
    <Grid
      grid={{
        autoColumns: 'max-content',
        autoFlow: 'column',
        templateRows: 'min-content',
      }}
    >
      <a href="/login">Sign In</a>
      <a href="/register">Register</a>
    </Grid>
  </Grid>
);
