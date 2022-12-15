import { useEffect, useRef } from 'react';

export interface IUseInterval {
  callback: (args: void) => void;
  delay: number;
}

function useInterval({ callback, delay }: IUseInterval) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
