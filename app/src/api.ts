export * from "lib/utils";

import { BellSchedule, LunchMenu } from "lib/utils";
import { Paths } from "api/src/paths";

export const apiPath = (path: Paths) => process.env.OPRF_API_URL + "/" + path;

const fetchPath = (path: Paths) => fetch(apiPath(path)).then(r => r.json());

export const bellSchedule = (): Promise<BellSchedule> =>
  fetchPath("bellSchedule");

export const lunchMenu = (): Promise<LunchMenu> => fetchPath("lunchMenu");
