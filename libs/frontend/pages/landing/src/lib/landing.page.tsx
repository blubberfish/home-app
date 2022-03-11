import { Box } from '@blubberfish/frontend/components'
import Hero from './hero'

export default () => {
  return (
    <Box width='100%' minHeight="100vh" display='grid' gridTemplateColumns='1fr' gridAutoRows="min-content" gridAutoFlow="row">
      <Hero />
      <Box p={3}></Box>
    </Box>
  );
};
