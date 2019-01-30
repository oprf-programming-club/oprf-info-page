export * from "lib/src/interfaces";

import { BellSchedule } from "lib/src/interfaces";

const fetchPath = (path: string) =>
  fetch(process.env.OPRF_API_URL + path).then(r => r.json());

export const bellSchedule = (): Promise<BellSchedule> =>
  fetchPath("/bellSchedule");

export const lunchMenu = (): Promise<string[]> => fetchPath("/lunchMenu");
