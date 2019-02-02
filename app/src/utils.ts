import { useState, useEffect } from "react";

export const usePromise = <T>(prom: () => Promise<T>): undefined | T => {
  const [state, setState] = useState<T | undefined>(undefined);

  useEffect(() => {
    prom().then(result => {
      setState(result);
    }, console.error);
  }, []);

  return state;
};
