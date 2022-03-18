import { Grid } from '@blubberfish/frontend/components';
import { HeroBody } from './body';
import { HeroHead } from './header';

export const Hero = () => (
  <Grid
    bg="steelblue"
    grid={{ templateColumns: '1fr', templateRows: 'min-content 1fr' }}
    w="100%"
  >
    <HeroHead />
    <HeroBody />
  </Grid>
);
