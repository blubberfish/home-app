import { useCallback, useEffect, useState } from 'react';

export const useApi = (apiCallback: () => Promise<void>, start?: boolean) => {
  const [pending, setPending] = useState(start ?? false);
  const call = useCallback(() => {
    setPending(() => true);
    apiCallback().finally(() => {
      setPending(() => false);
    });
  }, [apiCallback]);

  useEffect(() => {
    start && call();
  }, [call, start]);

  return [pending, call];
};
