import { Box } from '@blubberfish/frontend/components'
import { FrontEndLoginPath } from '@blubberfish/types'

const HeroBrand = () => (
  <span>BLUBBERFISH</span>
)

const HeroNav = () => (
  <Box gridGap={2} display='grid' gridAutoColumns='max-content' gridAutoFlow="column">
    <a href={FrontEndLoginPath.Root}>Login</a>
    <a href={FrontEndLoginPath.NewUser}>Register</a>
  </Box >
)

const HeroHead = () => (
  <Box p={3} gridGap={2} display='grid' gridAutoColumns='max-content' gridAutoFlow="column" alignItems='center' justifyContent='space-between' >
    <HeroBrand />
    <HeroNav />
  </Box >
)

export default () => (
  <Box bg='steelblue' color='aliceblue' display='grid' gridTemplateColumns='1fr' gridTemplateRows=' min-content 1fr' >
    <HeroHead />
    <Box p={5} display='grid' alignContent='center' justifyContent='center'>
      TEST
    </Box>
  </Box>
)
