import dateFns, {
  startOfToday,
  setHours,
  setMinutes,
  isWithinRange
} from "date-fns";
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

export const isLateWed = (bells: BellSchedule, day: Date = startOfToday()) =>
  bells.weds.some(wed => !!wed && dateFns.isSameDay(day, tupleDate(wed)));

export const formatBellTime = (bellTime: BellTime) =>
  bellTimeToDate(bellTime).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });

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

export const bellTimeToDate = (bell: BellTime, date: Date = startOfToday()) =>
  setMinutes(setHours(date, bell[0]), bell[1]);

export const dateWithinPeriod = (period: Period, date: Date = new Date()) =>
  isWithinRange(date, bellTimeToDate(period[0]), bellTimeToDate(period[1]));

export const periodForTime = (bells: BellSchedule, date: Date = new Date()) => {
  const periodType = periodTypeForDate(bells, date);
  if (!periodType) return null;
  let i = 1;
  for (const period of bells.periods) {
    if (dateWithinPeriod(period[periodType])) return i;
    i++;
  }
  return null;
};
