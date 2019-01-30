import { useState, useEffect } from "react";
import { BellSchedule } from "lib/src/interfaces";

export const usePromise = <T>(prom: () => Promise<T>): undefined | T => {
  const [state, setState] = useState<T | undefined>(undefined);

  useEffect(() => {
    prom().then(result => {
      setState(result);
    });
  }, []);

  return state;
};
