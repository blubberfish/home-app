import { Grid } from '@blubberfish/frontend/components';
import { HeroBody } from './body';
import { HeroHead } from './header';

export const Hero = () => (
  <Grid
    bgImg={{
      url: 'https://images.pond5.com/seamless-cinemagraph-loop-sun-shines-footage-120476649_iconl.jpeg',
      position: 'center bottom',
      size: 'cover',
    }}
    grid={{ templateColumns: '1fr', templateRows: 'min-content 1fr' }}
    w="100%"
    minH="100vh"
  >
    <HeroHead />
    <HeroBody />
  </Grid>
);
