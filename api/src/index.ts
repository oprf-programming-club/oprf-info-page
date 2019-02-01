import { ServerResponse, IncomingMessage } from "http";
import { parse as parseUrl } from "url";
import * as oprf from "lib/";
import analytics from "./analytics";
import { endStatus, endJSON } from "./utils";

export const DEFAULT_PORT = process.env.OPRF_API_DEFAULT_PORT!;

interface PathInfo {
  func:
    | oprf.PathFunc
    | { handler: (req: IncomingMessage, res: ServerResponse) => void };
  cacheAge?: number;
}

const validPaths: { [path: string]: PathInfo } = {
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

const _pathBase = parseUrl(process.env.OPRF_API_URL!).pathname || "/";
const pathBase = _pathBase.endsWith("/") ? _pathBase : _pathBase + "/";

const index = async (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url) {
    return endStatus(res, 404, "No URL found");
  }
  if (process.env.OPRF_API_CORS) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  if (!req.url.startsWith(pathBase)) {
    return endStatus(
      res,
      500,
      "Provided OPRF_API_URL doesn't match with path obtained from HTTP request"
    );
  }
  const url = parseUrl(req.url, true);
  const pathname = url.pathname!.slice(pathBase.length - 1);
  for (const [path, pathInfo] of Object.entries(validPaths)) {
    if (pathname == `/${path}`) {
      const { func } = pathInfo;
      if ("handler" in func) {
        return func.handler(req, res);
      } else {
        const data = await func(url.query);
        const { cacheAge } = pathInfo;
        if (process.env.NODE_ENV === "production" && cacheAge) {
          res.setHeader(
            "Cache-Control",
            `maxage=${cacheAge},s-maxage=${cacheAge}`
          );
        }
        return endJSON(res, data);
      }
    }
  }
  endStatus(res, 404, "Invalid request path");
};

export default index;
