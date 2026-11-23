import { useEffect, useEffectEvent, useState } from 'react';

interface PollingResult {
  error: Error | null;
}

export default function usePolling(
  callback: (signal: AbortSignal) => Promise<void>,
  isVisible: boolean,
  delay: number,
): PollingResult {
  const [error, setError] = useState<Error | null>(null);

  const onPoll = useEffectEvent(callback);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let active = true;

    const controller = new AbortController();

    const executePoll = async () => {
      if (!isVisible) {
        return;
      }

      try {
        await onPoll(controller.signal);

        if (active) {
          setError(null);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        if (active) {
          setError(error instanceof Error ? error : new Error(String(error)));
        }
      } finally {
        if (active) {
          timeoutId = setTimeout(executePoll, delay);
        }
      }
    };

    void executePoll();

    return () => {
      active = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [isVisible, delay]);

  return { error };
}
