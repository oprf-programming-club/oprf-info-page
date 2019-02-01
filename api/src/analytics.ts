import { IncomingMessage, ServerResponse } from "http";
import * as url from "url";
import { endStatus } from "./utils";
import got from "got";

async function analytics(req: IncomingMessage, res: ServerResponse) {
  const { query } = url.parse(req.url!, true);
  const { date } = query;
  if (!date || Array.isArray(date)) {
    return endStatus(res, 400, "Malformed request", "Bad date field");
  }

  let d: Date;
  try {
    d = new Date(date);
  } catch {
    return endStatus(res, 400, "Malformed request", "Bad date field");
  }

  await got
    .post(process.env.OPRF_API_ANALYTICS_URL!, {
      query: {
        date: d.toDateString()
      }
    })
    .catch(err => {
      if (err.statusCode != 302) console.error(err);
    });
  res.end();
}

function noop(_req: IncomingMessage, res: ServerResponse) {
  res.end();
}

export default (process.env.OPRF_API_ANALYTICS_URL ? analytics : noop);
