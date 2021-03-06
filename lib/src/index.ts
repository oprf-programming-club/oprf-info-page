import htmlparser2 from "htmlparser2";
import got from "got";
import cheerio from "cheerio";
import dateFns from "date-fns";
import { AllHtmlEntities } from "html-entities";
import { BellSchedule, PeriodInfo, LunchMenu, Period } from "./interfaces";

export * from "./interfaces";
export * from "./client-utils";

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

const OPRF_URLS = {
  BELLS_SCHEDULE: "http://oprfhs.org/about/Bell-Schedules.cfm",
  LUNCH_MENU:
    "https://intranet.oprfhs.org/Services/food_service/Pages/Student_Menu.aspx"
};

const hour = (hour: number) =>
  // Because they don't specify AM or PM on the website
  hour < 6 ? hour + 12 : hour;

/**
 * Fetches and consolidates information from the "Bell Schedules" page on the OPRF website.
 */
export const bellSchedule = async (): Promise<BellSchedule> => {
  const $ = await fetchWebsite(OPRF_URLS.BELLS_SCHEDULE);
  const periods: PeriodInfo[] = [];
  $(".content-e > div:first-child tbody tr").each((i, tr) => {
    const kids = $(tr).children();
    const getPeriods = (child: number): Period => {
      const text = kids
        .eq(child)
        .text()
        .trim();
      const match = text.match(/(\d+):(\d+)\s+-\s+(\d+):(\d+)/);
      if (!match) throw new Error(`Couldn't parse bell time: ${text}`);
      const numberMatches = match.map(Number);
      return [
        [hour(numberMatches[1]), numberMatches[2]],
        [hour(numberMatches[3]), numberMatches[4]]
      ];
    };
    const period = {
      normal: getPeriods(1),
      lateArrival: getPeriods(2)
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
  const weds: BellSchedule["weds"] = [];
  wedsDiv.find("tbody p").each((_i, p) => {
    const text = p.children[0].data!;
    const m = text.match(/(\w+)\s+(\d+)(?:\s+.+?\s+(\d+))?/);
    if (!m) throw new Error(`Couldn't parse ${JSON.stringify(text)}`);
    const month = new Date(`${m[1]} 1`).getMonth();
    const realYear =
      // if month is after July
      dateFns.isAfter(new Date(year, month), new Date(year, 6))
        ? // then first year of school year, e.g. 2018
          year
        : // else second year of school year, e.g. 2019
          year + 1;
    const addWed = (i: number) => {
      const day = Number(m[i]);
      weds.push([realYear, month, day]);
    };
    addWed(2);
    if (m[3] != null) addWed(3);
  });
  return {
    periods,
    weds
  };
};

export const lunchMenu = async (): Promise<LunchMenu> => {
  const $ = await fetchWebsite(OPRF_URLS.LUNCH_MENU);
  const tbody = $("table > tbody");
  const trs = tbody.children();
  const htmlEntities = new AllHtmlEntities();
  const menuItems = trs
    .eq(1)
    .children()
    .toArray()
    .map(td => {
      // The whole thing is a mess. Sometimes the text is in a `p`, sometimes a `span`,
      // and sometimes a `span` within a `p`.
      const text = $(td)
        .find("p, span")
        .toArray()
        // only lets through elements whose child is a text node
        .filter(p => p.children[0] && p.children[0].data)
        .map(p => $(p).text())
        .filter(s => s)
        .join("\n");
      return htmlEntities
        .decode(text)
        .replace(/[ \u00A0]+/g, " ")
        .replace(/ \n/g, "\n");
    });
  return menuItems;
};
