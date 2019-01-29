import htmlparser2 from "htmlparser2";
import gotDef from "got";
import cheerio from "cheerio";
import datefns from "date-fns";
import KeepAlive from "agentkeepalive";
import * as ntlm from "./ntlm";

const INTRANET_URL = "https://intranet.oprfhs.org";
const INTRANET_HOST = "intranet.oprfhs.org";
const INTRANET_DOMAIN = "OPRFAD";
const INTRANET_HOME = "https://intranet.oprfhs.org/Pages/default.aspx";

const got: typeof gotDef =
  // @ts-ignore
  gotDef.extend({
    agent: {
      http: new KeepAlive(),
      https: new KeepAlive.HttpsAgent()
    }
  });

export const gotAuth = async (username: string, pass: string): Promise<typeof gotDef> => {
  const res = await got(INTRANET_URL, {
    throwHttpErrors: false,
    headers: {
      Authorization: ntlm.challengeHeader(INTRANET_HOST, INTRANET_DOMAIN)
    }
  });

  return got
    // @ts-ignore
    .extend({
      headers: {
        Authorization: ntlm.responseHeader(
          res,
          INTRANET_HOST,
          INTRANET_DOMAIN,
          username,
          pass
        )
      }
    })
};

const authValid = async (username: string, pass: string) => {
  const got = await gotAuth(username, pass);
  const res = await got(INTRANET_HOME);
  return res.statusCode === 200
}

const cheerioResponse = (stream: NodeJS.ReadableStream) =>
  new Promise<CheerioStatic>((res, rej) => {
    // @ts-ignore
    const parser = htmlparser2.createDomStream((err, dom) => {
      if (err) {
        rej(err);
      } else {
        res(cheerio.load(dom));
      }
    });
    stream.pipe(parser);
  });

/**
 * Fetches a website and returns it as a cheerio object
 * @param url The URL of the website to fetch
 */
export const fetchWebsite = async (url: string) =>
  cheerioResponse(got.stream(url));

export const fetchIntranet = async (
  url: string,
  username: string,
  pass: string
) => {
  try {
    const got = await gotAuth(username, pass);
    return await cheerioResponse(got.stream(url));
  } catch (e) {
    console.log(e)
    return null;
  }
};

const OPRF_URLS = {
  BELLS_SCHEDULE: "http://oprfhs.org/about/Bell-Schedules.cfm",
  LUNCH_MENU: "https://intranet.oprfhs.org/Services/food_service/Pages/Student_Menu.aspx"
};

interface Period {
  /** The period number in a day, 1-8 */
  num: number;
  /** The start and end time of the period in a normal day */
  normal: string;
  /** The start and end time of the period on a late arrival Wednesday */
  lateArrival: string;
}

/** Consolidated information from the "Bell Schedules" page on the OPRF website. */
interface BellSchedule {
  /** Information about periods in a day */
  periods: Period[];
  /** Information about late arrival Wednesdays */
  weds: Array<Date | null>;
  /** The date of this upcoming Wednesday, formatted as a string */
  nextWed: string;
  /** Whether this upcoming Wednesday is a late arrival Wednesday */
  nextWedLate: boolean;
}

/**
 * Fetches and consolidates information from the "Bell Schedules" page on the OPRF website.
 */
export const bellSchedule = async (): Promise<BellSchedule> => {
  const $ = await fetchWebsite(OPRF_URLS.BELLS_SCHEDULE);
  const periods: Period[] = [];
  $(".content-e > div:first-child tbody tr").each((i, tr) => {
    const kids = $(tr).children();
    const getText = (i: number) =>
      kids
        .eq(i)
        .text()
        .trim();
    const period = {
      num: i + 1,
      normal: getText(1),
      lateArrival: getText(2)
    };
    periods.push(period);
  });
  const wedsDiv = $(".content-e > div:nth-child(2)");
  const year = Number(
    wedsDiv
      .find(".oprf-title h2")
      .text()
      .trim()
      .match(/^(\d+)/)![1]
  );
  const weds: Array<Date | null> = [];
  wedsDiv.find("tbody p").each((_i, p) => {
    const text = p.children[0].data!;
    const m = text.match(/(\w+)\s+(\d+)(?:\s+.+?\s+(\d+))?/);
    if (!m) throw new Error(`Couldn't parse ${JSON.stringify(text)}`);
    const month = new Date(`${m[1]} 1`).getMonth();
    const realYear =
      // if month is after July
      datefns.isAfter(new Date(year, month), new Date(year, 6))
        ? // then first year of school year, e.g. 2018
        year
        : // else second year of school year, e.g. 2019
        year + 1;
    const addWed = (i: number) => {
      const day = Number(m[i]);
      const date = new Date(realYear, month, day);
      weds.push(
        // in case the date's wrong for whatever reason
        datefns.isWednesday(date) ? date : null
      );
    };
    addWed(2);
    if (m[3] != null) addWed(3);
  });
  const today = datefns.startOfToday();
  let nextWed = datefns.setDay(today, 3);
  if (datefns.isAfter(today, nextWed)) {
    nextWed = datefns.addWeeks(nextWed, 1);
  }
  const nextWedLate = weds.some(wed => !!wed && datefns.isEqual(nextWed, wed));
  return {
    periods,
    weds,
    nextWed: datefns.format(nextWed, "MMMM Do"),
    nextWedLate
  };
};

export const lunchMenu = async (username: string, pass: string) => {
  const $ = (await fetchIntranet(OPRF_URLS.LUNCH_MENU, username, pass))!;
  const tbody = $("table > tbody");
  console.log(tbody.html())
  return []
};
