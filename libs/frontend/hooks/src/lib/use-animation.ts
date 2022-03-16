import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type AnimationDuration = Partial<{
  ms: number;
  s: number;
  m: number;
}>;

export type AnimationOptions = {
  duration: AnimationDuration;
  loop?: boolean;
  onEnd?: () => void;
};

export const useAnimation = ({ duration, loop, onEnd }: AnimationOptions) => {
  const animationDuration = useMemo(() => {
    const { m, ms, s } = duration ?? {};
    return (m ?? 0) * 60 * 1000 + (s ?? 0) * 1000 + (ms ?? 0);
  }, [duration]);
  const refTime = useRef(0);
  const refFrame = useRef(0);
  const [normalizedProgress, setNormalizedProgress] = useState(0);

  const animate = useCallback(
    (time: number) => {
      if (!animationDuration) return;

      refTime.current = refTime.current || time;
      const animationProgress = (time - refTime.current) / animationDuration;

      if (!loop && animationProgress > 1) {
        setNormalizedProgress(() =>
          Math.max(0, Math.min(1, animationProgress))
        );
        onEnd && onEnd();
        return;
      }

      setNormalizedProgress(() => animationProgress % 1);
      refFrame.current = requestAnimationFrame(animate);
    },
    [animationDuration, loop, onEnd]
  );

  useEffect(() => {
    refFrame.current = requestAnimationFrame(animate);
  }, [animate]);

  return [normalizedProgress, animationDuration];
};
