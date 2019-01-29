import { ServerResponse, IncomingMessage } from "http";
import { URL } from "url";
import * as oprf from "../../lib/src";

const tuple = <T extends string[]>(...a: T) => a;

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

const validPaths = tuple("bellSchedule", "lunchMenu");

const _pathBase = new URL(process.env.OPRF_API_URL!, "http://example.com")
  .pathname;
const pathBase = _pathBase.endsWith("/") ? _pathBase : _pathBase + "/";

const index = async (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url) {
    return endStatus(res, 404, "No URL found");
  }
  if (process.env.NODE_ENV === "development") {
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
  for (const path of validPaths) {
    if (pathname == `/${path}`) {
      const apiFunc = oprf[path];
      const data = await apiFunc();
      return endJSON(res, data);
    }
  }
  endStatus(res, 404, "Invalid request path");
};

export default index;
