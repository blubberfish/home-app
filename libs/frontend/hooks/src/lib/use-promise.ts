import { useCallback, useEffect, useState } from 'react';

export const usePromise = (
  promiseCallback: () => Promise<void>,
  start?: boolean
) => {
  const [pending, setPending] = useState(start ?? false);
  const call = useCallback(() => {
    setPending(() => true);
    promiseCallback().finally(() => {
      setPending(() => false);
    });
  }, [promiseCallback]);

  useEffect(() => {
    start && call();
  }, [call, start]);

  return [pending, call];
};
