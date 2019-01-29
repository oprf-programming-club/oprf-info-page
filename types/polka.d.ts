/// <reference types="node" />

import http, { IncomingMessage, ServerResponse } from "http";
import Router from "trouter";
import url, { URL } from "@polka/url";

type NextFunc = (err: string | Error) => void;

interface Options extends Router.Options {
  server?: http.Server;
  onError: (
    err: any,
    req: IncomingMessage,
    res: ServerResponse,
    next: NextFunc
  ) => void;
  onNoMatch: (req: IncomingMessage, res: ServerResponse) => void;
}

declare function polka(options?: Options): Polka;

type Handler = (
  req: IncomingMessage,
  res: ServerResponse
) => Promise<void> | void;

type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunc
) => void;

declare class Polka extends Router<Handler> {
  opts: Options;
  parse: typeof url;
  server?: http.Server;
  onError: Options["onError"];
  onNoMatch: Options["onNoMatch"];

  use(base: string | Middleware, ...fns: Middleware[]): this;
  listen(): void;
  handler(req: IncomingMessage, res: ServerResponse, url?: URL): any;
}

export = polka;
