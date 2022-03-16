import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Grid } from '../box';

const PlainSegment = ({ onClick }: { onClick?: () => void }) => (
  <Box radius={{ all: 2 }} w={32} h={4} bg="#fff8" onClick={onClick} />
);

type ActiveSegmentProps = {
  auto?: {
    duration: {
      milliseconds?: number;
      seconds?: number;
      minutes?: number;
    };
    onEnd?: () => void;
  };
  onClick?: () => void;
};

const ActiveSegment = ({ auto, onClick }: ActiveSegmentProps) => {
  const refFrame = useRef(0);
  const [progress, setProgress] = useState(auto ? 0 : 100);
  const [completed, setCompleted] = useState(false);
  const [lStyle, rStyle] = useMemo(
    () => [
      {
        clipPath: `inset(0% ${100 - progress}% 0% 0%)`,
      },
      {
        clipPath: `inset(0% 0% 0% ${progress}%)`,
      },
    ],
    [progress]
  );

  const duration = useMemo(() => {
    if (!auto) {
      return 0;
    }
    const {
      duration: { milliseconds, minutes, seconds },
    } = auto;
    return (milliseconds ?? 0) + (seconds ?? 0) * 1000 + (minutes ?? 0) * 60000;
  }, [auto]);

  const animate = useMemo(() => {
    let refTime: number | null = null;
    const animation = (time: number) => {
      const factor = Math.min(
        100,
        Math.max(0, ((time - (refTime ?? time)) / duration) * 100)
      );
      if (!refTime) refTime = time;
      setProgress(() => factor);
      if (factor < 100) {
        refFrame.current = requestAnimationFrame(animation);
      } else {
        setCompleted(true);
      }
    };
    return animation;
  }, [duration]);

  useEffect(() => {
    if (!auto) {
      setProgress(100);
    } else {
      refFrame.current = requestAnimationFrame(animate);
      return () => {
        !refFrame.current && cancelAnimationFrame(refFrame.current);
      };
    }
    return undefined;
  }, [auto, animate]);

  useEffect(() => {
    completed && auto?.onEnd && auto.onEnd();
  }, [completed, auto]);

  return (
    <Box
      radius={{ all: 2 }}
      w={32}
      h={4}
      bg="#fff8"
      onClick={onClick}
      position="relative"
    >
      <Box w="100%" h="100%" bg="#fff8" style={lStyle} />
      <Box
        bg="#fff3"
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
  active?: number;
  auto?: ActiveSegmentProps['auto'];
  onSelect?: (index: number) => void;
};

export const CarouselIndicator = ({
  count,
  auto,
  active,
  onSelect,
}: CarouselIndicatorProps) => {
  const content = useMemo(
    () =>
      new Array(Math.max(1, count)).fill(null).map((_, i) =>
        i === active ? (
          <ActiveSegment
            key={i}
            auto={auto}
            onClick={() => {
              onSelect && onSelect(i);
            }}
          />
        ) : (
          <PlainSegment
            key={i}
            onClick={() => {
              onSelect && onSelect(i);
            }}
          />
        )
      ),
    [active, auto, count, onSelect]
  );
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
