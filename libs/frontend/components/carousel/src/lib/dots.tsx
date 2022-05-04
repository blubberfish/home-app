import { useEffect, useMemo, useState } from 'react';
import { useAnimation, AnimationDuration } from '@blubberfish/frontend/hooks';
import { Box, Grid } from '@blubberfish/frontend/components/box';

const PlainDot = ({
  color,
  onClick,
}: {
  color?: string;
  onClick?: () => void;
}) => <Box rad={2} bg={color} onClick={onClick} overflow="hidden" />;

type ActiveDotProps = {
  activeColor?: string;
  color?: string;
  duration?: AnimationDuration;
  onEnd?: () => void;
  onClick?: () => void;
};

const ActiveDot = ({
  activeColor,
  color,
  duration,
  onEnd,
  onClick,
}: ActiveDotProps) => {
  const [progress, totalTime] = useAnimation({
    duration: duration ?? {},
    onEnd,
  });
  const clipStyle = useMemo(
    () => ({
      clipPath: `inset(0% ${totalTime ? 100 - progress * 100 : 0}% 0% 0% )`,
    }),
    [progress, totalTime]
  );

  return (
    <Box bg="#fff8" onClick={onClick} overflow="hidden" pos="relative" rad={2}>
      <Box bg={color} h="100%" w="100%" />
      <Box
        bg={activeColor}
        pos="absolute"
        posL="0"
        posR="0"
        posT="0"
        posB="0"
        style={clipStyle}
      />
    </Box>
  );
};

export type CarouselIndicatorProps = {
  activeColor?: string;
  color?: string;
  count: number;
  duration?: ActiveDotProps['duration'];
  layout?: {
    size?: number | string;
    gap?: number | string;
    thickness?: number | string;
  };
  onChange?: (index: number) => void;
};

export const CarouselDots = ({
  activeColor = '#fff8',
  color = '#0008',
  count,
  duration,
  layout,
  onChange,
}: CarouselIndicatorProps) => {
  const { gap = 3, size = 24, thickness = 4 } = layout ?? {};
  const [active, setActive] = useState(0);
  const content = useMemo(
    () =>
      new Array(Math.max(1, count)).fill(null).map((_, i) => {
        const handleClick = () => {
          setActive(() => i);
        };
        return i === active ? (
          <ActiveDot
            key={i}
            activeColor={activeColor}
            color={color}
            duration={duration}
            onClick={handleClick}
            onEnd={() => {
              setActive((current) => (current + 1) % Math.max(1, count));
            }}
          />
        ) : (
          <PlainDot key={i} color={color} onClick={handleClick} />
        );
      }),
    [active, activeColor, color, count, duration]
  );

  useEffect(() => {
    onChange && onChange(active);
  }, [active, onChange]);

  return (
    <Grid
      autoColumns={`${size}px`}
      autoFlow="column"
      templateRows={`${thickness}px`}
      gap={gap}
    >
      {content}
    </Grid>
  );
};
