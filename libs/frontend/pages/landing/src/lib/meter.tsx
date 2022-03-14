import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@blubberfish/frontend/components';

export const Meter = ({
  value: v,
  onEnd,
}: {
  onEnd?: () => void;
  value: number;
}) => {
  const referenceTime = useRef<number>(0);
  const frame = useRef<number>();
  const [value, setValue] = useState(Math.max(0, Math.min(100, v)));

  useEffect(() => {
    const animate = (t: number) => {
      const age = t - (referenceTime.current || t);
      const factor = Math.min(1, age / 10000); // 1s
      setValue(() => (1 - factor) * v);
      if (!referenceTime.current) referenceTime.current = t;
      if (factor < 1) {
        frame.current = requestAnimationFrame(animate);
      } else {
        onEnd?.();
        frame.current = 0;
      }
    };
    requestAnimationFrame(animate);
    return () => {
      if (frame.current) {
        frame.current = 0;
        cancelAnimationFrame(frame.current);
      }
    };
  }, [v, onEnd]);

  return (
    <Box w="256px" h="8px" bg="dimgray">
      <Box
        w="100%"
        h="100%"
        bg="blue"
        style={{
          clipPath: `inset(0% ${Math.max(0, Math.min(100, value))}% 0% 0%)`,
        }}
      />
    </Box>
  );
};
