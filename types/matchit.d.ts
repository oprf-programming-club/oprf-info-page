declare const enum RouteType {
  STATIC = 0,
  PARAMETER = 1,
  ANY = 2,
  OPTIONAL = 3
}

interface RouteSegment {
  old: string;
  type: RouteType;
  val: string;
}

type Route = RouteSegment[];

export function parse(route: string): Route;
export function match(url: string, routes: Route[]): Route;
export function exec(url: string, match: Route): { [k: string]: string };
