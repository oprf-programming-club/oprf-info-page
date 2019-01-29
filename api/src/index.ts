import { ServerResponse, IncomingMessage } from "http";
import parseurl from "@polka/url";
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

const pathBase = parseurl({ url: process.env.OPRF_API_URL })!.pathname;

const index = async (req: IncomingMessage, res: ServerResponse) => {
  const url = parseurl(req);
  if (process.env.NODE_ENV === "development") {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  if (!url) {
    return endStatus(res, 404, "No URL found");
  }
  if (!url.pathname.startsWith(pathBase)) {
    return endStatus(
      res,
      500,
      "Provided OPRF_API_URL doesn't match with path obtained from HTTP request"
    );
  }
  const pathname = url.pathname.slice(pathBase.length);
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
