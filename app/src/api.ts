export * from "lib/utils";

import { ValidPaths, BellSchedule, LunchMenu } from "lib/utils";

const fetchPath = (path: ValidPaths) =>
  fetch(process.env.OPRF_API_URL + "/" + path).then(r => r.json());

export const bellSchedule = (): Promise<BellSchedule> =>
  fetchPath("bellSchedule");

export const lunchMenu = (): Promise<LunchMenu> => fetchPath("lunchMenu");
