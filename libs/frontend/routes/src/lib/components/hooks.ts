import { useCallback, useEffect, useState } from 'react';

export type ApiHookOptions = {
  autoStart?: boolean;
};

export const useApi = <ApiError = Error>(
  service: () => Promise<void>,
  options: ApiHookOptions = {}
) => {
  const [pending, setPending] = useState(options.autoStart ?? false);
  const call = useCallback(() => {
    setPending(true);
    service().finally(() => {
      setPending(() => false);
    });
  }, [service]);
  useEffect(() => {
    options.autoStart && call();
  }, [call, options.autoStart]);

  return [pending, call];
};
