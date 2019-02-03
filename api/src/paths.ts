import { IncomingMessage, ServerResponse } from "http";
import * as oprf from "oprf";
import analytics from "./analytics";

export type PathFunc = (opts: {
  [k: string]: string | string[];
}) => Promise<any>;

export interface PathInfo {
  func:
    | PathFunc
    | { handler: (req: IncomingMessage, res: ServerResponse) => void };
  cacheAge?: number;
}

const _paths = {
  bellSchedule: {
    func: oprf.bellSchedule,
    cacheAge: 84600
  },
  lunchMenu: {
    func: oprf.lunchMenu,
    cacheAge: 169200
  },
  analytics: {
    func: { handler: analytics }
  }
};

export const paths = (<P extends string>(paths: { [p in P]: PathInfo }) => {
  return paths;
})(_paths);

export type Paths = keyof typeof paths;
