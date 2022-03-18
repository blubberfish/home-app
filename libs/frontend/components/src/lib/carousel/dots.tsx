import { useEffect, useMemo, useState } from 'react';
import { useAnimation, AnimationDuration } from '@blubberfish/frontend/hooks';
import { Box, Grid } from '../box';
import { num2Px } from '../theme/helpers/css';

const PlainDot = ({
  color,
  onClick,
}: {
  color?: string;
  onClick?: () => void;
}) => (
  <Box radius={{ all: 2 }} bg={color} onClick={onClick} overflow="hidden" />
);

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
    <Box
      radius={{ all: 2 }}
      bg="#fff8"
      onClick={onClick}
      overflow="hidden"
      position="relative"
    >
      <Box w="100%" h="100%" bg={color} />
      <Box
        bg={activeColor}
        position="absolute"
        l="0"
        r="0"
        t="0"
        b="0"
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
      grid={{
        autoColumns: num2Px(size),
        autoFlow: 'column',
        templateRows: num2Px(thickness),
        gap: num2Px(gap),
      }}
    >
      {content}
    </Grid>
  );
};
