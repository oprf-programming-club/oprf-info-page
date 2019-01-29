export * from "../../lib/src/interfaces";

import { BellSchedule } from "../../lib/src/interfaces";

const parseDate = (str: any) => str && new Date(str);

export const bellSchedule = (): Promise<BellSchedule> =>
 fetch(
    process.env.OPRF_API_URL + "/bellSchedule"
  ).then(r => r.json());

export const lunchMenu = () => fetch(process.env.OPRF_API_URL + "/lunchMenu").then(r => r.json());
