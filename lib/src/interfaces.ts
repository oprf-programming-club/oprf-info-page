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
  /** Information about late arrival Wednesdays */
  weds: Array<Date | null>;
  /** The date of this upcoming Wednesday, formatted as a string */
  nextWed: string;
  /** Whether this upcoming Wednesday is a late arrival Wednesday */
  nextWedLate: boolean;
}
