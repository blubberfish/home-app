import { Box, Grid, Link, FontWeight } from '@blubberfish/frontend/components';
import { FrontEndPublicPath } from '@blubberfish/frontend/pages/routes';

const HeroNav = () => (
  <Grid
    grid={{
      gap: 16,
      autoColumns: 'max-content',
      autoFlow: 'column',
      templateRows: 'min-content',
    }}
  >
    <Link href={FrontEndPublicPath.Root} weight={FontWeight.light}>
      Login
    </Link>
    <Link href={FrontEndPublicPath.NewUser} weight={FontWeight.light}>
      Register
    </Link>
  </Grid>
);

const HeroHead = () => (
  <Grid
    px={32}
    py={16}
    grid={{
      justifyContent: 'end',
      autoColumns: 'max-content',
      autoFlow: 'column',
      templateRows: 'min-content',
    }}
  >
    <HeroNav />
  </Grid>
);

export default () => (
  <Grid
    bgImg={{
      url: 'https://s3-eu-west-1.amazonaws.com/video.gallereplay.com/free_cinemagraphs/Gif/Waves-and-Reflected-Clouds.gif',
      position: 'center',
      size: 'cover',
    }}
    fg="aliceblue"
    grid={{ templateColumns: '1fr', templateRows: ['min-content', '1fr'] }}
  >
    <HeroHead />
    <Grid
      px={32}
      py={128}
      grid={{
        alignItems: 'center',
        justifyItems: 'center',
        templateColumns: '1fr',
        templateRows: '1fr',
      }}
    >
      <Box bg="#0003" w={256} h={256} radius={{ all: '50%' }} />
    </Grid>
  </Grid>
);
