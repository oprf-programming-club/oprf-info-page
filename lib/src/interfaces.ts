export interface Period {
  /** The start and end time of the period in a normal day */
  normal: string;
  /** The start and end time of the period on a late arrival Wednesday */
  lateArrival: string;
}

/** Consolidated information from the "Bell Schedules" page on the OPRF website. */
export interface BellSchedule {
  /** Information about periods in a day */
  periods: Period[];
  /**
   * Information about late arrival Wednesdays. Tuples of year, month, day;
   * because server -> client dates are annoying
   */
  weds: Array<[number, number, number] | null>;
}

export type LunchMenu = string[];
