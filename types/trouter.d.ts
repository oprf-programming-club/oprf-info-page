import matchit from "matchit";

declare class Router<T> {
  constructor(opts?: Router.Options);
  opts: Router.Options;
  routes: { [method in Router.Method]?: matchit.Route[] };
  handlers: {
    [method in Router.Method]?: {
      [pattern: string]: T[];
    }
  };
  all(pattern: string, ...fns: T[]): this;
  get(pattern: string, ...fns: T[]): this;
  head(pattern: string, ...fns: T[]): this;
  patch(pattern: string, ...fns: T[]): this;
  options(pattern: string, ...fns: T[]): this;
  connect(pattern: string, ...fns: T[]): this;
  delete(pattern: string, ...fns: T[]): this;
  trace(pattern: string, ...fns: T[]): this;
  post(pattern: string, ...fns: T[]): this;
  put(pattern: string, ...fns: T[]): this;
  add(method: Router.Method, pattern: string, ...fns: T[]): this;
  find(
    method: Router.Method,
    url: string
  ):
    | {
        params: { [k: string]: string };
        handlers: T[];
      }
    | false;
}

declare namespace Router {
  export interface Options {}

  export type Method =
    | "*"
    | "GET"
    | "HEAD"
    | "PATCH"
    | "OPTIONS"
    | "CONNECT"
    | "DELETE"
    | "TRACE"
    | "POST"
    | "PUT";
}

export = Router;
