import { useEffect, useRef } from "react";

type IntervalFunction = () => unknown | void;

export function useInterval(callback: IntervalFunction, delay: number | null) {
  const savedCallback = useRef<IntervalFunction | null>(null);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const tick = () => {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
}
