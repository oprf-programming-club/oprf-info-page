import { ServerResponse, IncomingMessage } from "http";
import { parse as parseUrl } from "url";
import * as oprf from "lib/";

const endStatus = (
  res: ServerResponse,
  statusCode: number,
  statusMessage?: string,
  message = statusMessage
) => {
  res.statusCode = statusCode;
  if (statusMessage) res.statusMessage = statusMessage;
  res.end(message);
};

const endJSON = (res: ServerResponse, obj: any) => {
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(obj));
  res.write("\n");
  res.end();
};

export const DEFAULT_PORT = process.env.OPRF_API_DEFAULT_PORT!;

interface PathInfo {
  cacheAge?: number;
}

const validPaths: { [path in oprf.ValidPaths]: PathInfo } = {
  bellSchedule: {
    cacheAge: 84600
  },
  lunchMenu: {
    cacheAge: 169200
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
  const pathname = req.url.slice(pathBase.length - 1);
  for (const [path, pathInfo] of Object.entries(validPaths)) {
    if (pathname == `/${path}`) {
      const apiFunc: oprf.PathFunc = oprf[path];
      const { query } = parseUrl(req.url, true);
      const data = await apiFunc(query);
      if (process.env.NODE_ENV === "production" && pathInfo.cacheAge) {
        res.setHeader("Cache-Control", `s-maxage=${pathInfo.cacheAge}`);
      }
      return endJSON(res, data);
    }
  }
  endStatus(res, 404, "Invalid request path");
};

export default index;
