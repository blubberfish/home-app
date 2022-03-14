import { Box, Grid } from '@blubberfish/frontend/components';
import { FrontEndPublicPath } from '@blubberfish/frontend/pages/routes';

const HeroBrand = () => <span>BLUBBERFISH</span>;

const HeroNav = () => (
  <Grid
    grid={{
      gap: 16,
      autoColumns: 'max-content',
      autoFlow: 'column',
      templateRows: 'min-content',
    }}
  >
    <a href={FrontEndPublicPath.Root}>Login</a>
    <a href={FrontEndPublicPath.NewUser}>Register</a>
  </Grid>
);

const HeroHead = () => (
  <Grid
    px={32}
    py={16}
    grid={{
      justifyContent: 'space-between',
      autoColumns: 'max-content',
      autoFlow: 'column',
      templateRows: 'min-content',
    }}
  >
    <HeroBrand />
    <HeroNav />
  </Grid>
);

export default () => (
  <Grid
    bg="steelblue"
    fg="aliceblue"
    grid={{ templateColumns: '1fr', templateRows: ['min-content', '1fr'] }}
  >
    <HeroHead />
    <Box px={32} py={64}>
      TEST
    </Box>
  </Grid>
);
