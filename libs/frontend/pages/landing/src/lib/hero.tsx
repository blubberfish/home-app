import { Box, Grid } from '@blubberfish/frontend/components';
import { FrontEndPublicPath } from '@blubberfish/frontend/pages/routes';

const HeroBrand = () => <span>BLUBBERFISH</span>;

const HeroNav = () => (
  <Grid
    grid={{
      justifyContent: 'end',
      templateColumns: '1fr',
      templateRows: 'min-content',
    }}
  >
    <a href={FrontEndPublicPath.Root}>Login</a>
    <a href={FrontEndPublicPath.NewUser}>Register</a>
  </Grid>
);

const HeroHead = () => (
  <Box p={3}>
    <HeroBrand />
    <HeroNav />
  </Box>
);

export default () => (
  <Box bg="steelblue" fg="aliceblue">
    <HeroHead />
    <Box p={5}>TEST</Box>
  </Box>
);
