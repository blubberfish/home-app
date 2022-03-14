import { useState } from 'react';
import { Box, CarouselIndicator } from '@blubberfish/frontend/components';
import Hero from './hero';

export const Page = () => {
  const [active, setActive] = useState(0);

  return (
    <Box w="100%" minH="100vh">
      <Hero />
      <Box bg="slategray" p={32}>
        <CarouselIndicator active={1} count={3} />
      </Box>
      <Box bg="darkslategray" p={32}>
        <CarouselIndicator
          active={active}
          auto={{
            duration: { seconds: 3 },
            onEnd: () => {
              setActive((current) => (current < 2 ? current + 1 : 0));
            },
          }}
          count={3}
        />
      </Box>
    </Box>
  );
};
