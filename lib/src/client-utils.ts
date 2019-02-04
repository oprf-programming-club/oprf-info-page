import dateFns, {
  startOfToday,
  setHours,
  setMinutes,
  isWithinRange
} from "date-fns";
import { BellSchedule, BellTime, Period, PeriodInfo } from "./interfaces";

export * from "./interfaces";

export const tupleDate = (date: [number, number, number]) => new Date(...date);

export const nextWed = () => {
  let nextWed = dateFns.setDay(dateFns.startOfToday(), 3);
  if (dateFns.isPast(nextWed)) {
    nextWed = dateFns.addWeeks(nextWed, 1);
  }
  return nextWed;
};

export const isLateWed = (bells: BellSchedule, day: Date = startOfToday()) =>
  bells.weds.some(wed => !!wed && dateFns.isSameDay(day, tupleDate(wed)));

export const formatBellTime = (bellTime: BellTime) =>
  `${bellTime[0]}:${("0" + bellTime[1]).slice(-2)}`;

export const formatPeriod = (period: Period) =>
  `${formatBellTime(period[0])} - ${formatBellTime(period[1])}`;

export const periodTypeForDate = (
  bells: BellSchedule,
  date: Date = startOfToday()
): "normal" | "lateArrival" | null =>
  dateFns.isWeekend(date)
    ? null
    : isLateWed(bells, date)
    ? "lateArrival"
    : "normal";

export const periodForDate = (
  bells: BellSchedule,
  period: PeriodInfo,
  date: Date = startOfToday()
): Period | null => {
  const type = periodTypeForDate(bells, date);
  return type && period[type];
};

export const bellTimeToDate = (bell: BellTime, date = startOfToday()) =>
  setMinutes(setHours(date, bell[0]), bell[1]);

export const dateWithinPeriod = (period: Period, date = new Date()) =>
  isWithinRange(date, bellTimeToDate(period[0]), bellTimeToDate(period[1]));
