export * from "lib/utils";

import { ValidPaths, BellSchedule, LunchMenu } from "lib/utils";

export const apiPath = (path: string) => process.env.OPRF_API_URL + "/" + path

const fetchPath = (path: string) =>
  fetch(apiPath(path)).then(r => r.json());

export const bellSchedule = (): Promise<BellSchedule> =>
  fetchPath("bellSchedule");

export const lunchMenu = (): Promise<LunchMenu> => fetchPath("lunchMenu");
