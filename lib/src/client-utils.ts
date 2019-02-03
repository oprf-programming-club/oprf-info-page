import dateFns from "date-fns";
import { BellSchedule, BellTime, Period } from "./interfaces";

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

export const formatBellTime = (bellTime: BellTime) =>
  `${bellTime[0]}:${("0" + bellTime[1]).slice(-2)}`;

export const formatPeriod = (period: Period) =>
  `${formatBellTime(period[0])} - ${formatBellTime(period[1])}`;
