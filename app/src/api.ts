export * from "lib/utils";

import { ValidPaths, BellSchedule } from "lib/utils";

const fetchPath = (path: ValidPaths) =>
  fetch(process.env.OPRF_API_URL + "/" + path).then(r => r.json());

export const bellSchedule = (): Promise<BellSchedule> =>
  fetchPath("bellSchedule");

export const lunchMenu = (): Promise<string[]> => fetchPath("lunchMenu");
