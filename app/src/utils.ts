import { useState, useEffect } from "react";

interface UsePromiseOptions<T> {
  then?: (result: T) => void;
  initialState?: T;
}

export const usePromise = <T>(
  prom: () => Promise<T>,
  { then, initialState }: UsePromiseOptions<T> = {}
): typeof initialState => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    prom().then(result => {
      if (then) then(result);
      setState(result);
    }, console.error);
  }, []);

  return state;
};

export const arrRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
