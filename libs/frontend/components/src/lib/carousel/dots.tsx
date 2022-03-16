import { useEffect, useMemo, useState } from 'react';
import { useAnimation, AnimationDuration } from '@blubberfish/frontend/hooks'
import { Box, Grid } from '../box';

const PlainDot = ({ onClick }: { onClick?: () => void }) => (
  <Box radius={{ all: 2 }} w={32} h={4} bg="#0008" onClick={onClick} />
);

type ActiveDotProps = {
  duration?: AnimationDuration,
  onEnd?: () => void;
  onClick?: () => void;
};

const ActiveDot = ({ duration, onEnd, onClick }: ActiveDotProps) => {
  const [progress, totalTime] = useAnimation({ duration: duration ?? {}, onEnd })
  const [lStyle, rStyle] = useMemo(
    () => [
      {
        clipPath: `inset(0% ${totalTime ? 100 - (progress * 100) : 0}% 0% 0%)`,
      },
      {
        clipPath: `inset(0% 0% 0% ${totalTime ? progress * 100 : 100}%)`,
      },
    ],
    [progress, totalTime]
  );

  return (
    <Box
      radius={{ all: 2 }}
      w={32}
      h={4}
      bg="#fff8"
      onClick={onClick}
      position="relative"
    >
      <Box w="100%" h="100%" bg="#0003" style={lStyle} />
      <Box
        bg="#0008"
        style={rStyle}
        position="absolute"
        l={0}
        r={0}
        t={0}
        b={0}
      />
    </Box>
  );
};

export type CarouselIndicatorProps = {
  count: number;
  duration?: ActiveDotProps['duration'];
  onChange?: (index: number) => void
};

export const CarouselDots = ({
  count,
  duration,
  onChange
}: CarouselIndicatorProps) => {
  const [active, setActive] = useState(0)
  const content = useMemo(
    () =>
      new Array(Math.max(1, count)).fill(null).map((_, i) => {
        const handleClick = () => {
          setActive(() => i)
        }
        return i === active ? (
          <ActiveDot
            key={i}
            duration={duration}
            onClick={handleClick}
            onEnd={() => {
              setActive(current => (current + 1) % Math.max(1, count))
            }}
          />
        ) : (
          <PlainDot
            key={i}
            onClick={handleClick}
          />
        )
      }),
    [active, count, duration]
  );

  useEffect(() => {
    onChange && onChange(active)
  }, [active, onChange])

  return (
    <Grid
      grid={{
        autoColumns: 'max-content',
        autoFlow: 'column',
        templateRows: 'min-content',
        gap: 8,
      }}
    >
      {content}
    </Grid>
  );
};
