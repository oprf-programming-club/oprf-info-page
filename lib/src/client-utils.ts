import datefns from "date-fns";
import { BellSchedule } from "./interfaces";

export * from "./interfaces";

type oprf = typeof import(".");

export type PathFunc = (
  opts: { [k: string]: string | string[] }
) => Promise<any>;

// It works, don't ask
export type ValidPaths = {
  [path in keyof oprf]: oprf[path] extends PathFunc ? path : never
}[keyof oprf];

export const tupleDate = (date: [number, number, number]) => new Date(...date);

export const nextWed = () => {
  let nextWed = datefns.setDay(datefns.startOfToday(), 3);
  if (datefns.isPast(nextWed)) {
    nextWed = datefns.addWeeks(nextWed, 1);
  }
  return nextWed;
};

export const isLateWed = (bells: BellSchedule, day: Date) =>
  bells.weds.some(wed => !!wed && datefns.isSameDay(day, tupleDate(wed)));
