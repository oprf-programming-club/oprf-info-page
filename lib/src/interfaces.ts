export type BellTime = [number, number];

export type Period = [BellTime, BellTime];

export interface PeriodInfo {
  /** The start and end time of the period in a normal day */
  normal: Period;
  /** The start and end time of the period on a late arrival Wednesday */
  lateArrival: Period;
}

/** Consolidated information from the "Bell Schedules" page on the OPRF website. */
export interface BellSchedule {
  /** Information about periods in a day */
  periods: PeriodInfo[];
  /**
   * Information about late arrival Wednesdays. Tuples of year, month, day;
   * because server -> client dates are annoying
   */
  weds: Array<[number, number, number] | null>;
}

export type LunchMenu = string[];
