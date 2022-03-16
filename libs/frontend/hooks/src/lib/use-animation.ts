import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useAnimation = (
  duration: {
    ms?: number;
    s?: number;
    m?: number;
  },
  loop?: boolean
) => {
  const animationDuration = useMemo(() => {
    const { m, ms, s } = duration ?? {};
    return (m ?? 0) * 60 * 1000 + (s ?? 0) * 1000 + (ms ?? 0);
  }, [duration]);
  const refTime = useRef(0);
  const refFrame = useRef(0);
  const [progress, setProgress] = useState(0);

  const animate = useCallback(
    (time: number) => {
      if (!animationDuration) return;

      refTime.current = refTime.current || time;
      const animationProgress = time - refTime.current / animationDuration;

      if (!loop && animationProgress > 1) {
        setProgress(() => Math.max(0, Math.min(1, animationProgress)));
        return;
      }

      setProgress(() => animationProgress % 1);
      refFrame.current = requestAnimationFrame(animate);
    },
    [animationDuration, loop]
  );

  useEffect(() => {
    refFrame.current = requestAnimationFrame(animate);
  }, [animate]);

  return progress;
};
