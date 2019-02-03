import dateFns from "date-fns";
import { BellSchedule } from "./interfaces";

export * from "./interfaces";

export const tupleDate = (date: [number, number, number]) => new Date(...date);

export const nextWed = () => {
  let nextWed = dateFns.setDay(dateFns.startOfToday(), 3);
  if (dateFns.isPast(nextWed)) {
    nextWed = dateFns.addWeeks(nextWed, 1);
  }
  return nextWed;
};

export const isLateWed = (bells: BellSchedule, day: Date) =>
  bells.weds.some(wed => !!wed && dateFns.isSameDay(day, tupleDate(wed)));
