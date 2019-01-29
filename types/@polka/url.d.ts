interface Request {
  url?: string;
}

declare function url(req: Request): url.URL | undefined;

declare namespace url {
  export interface URL {
    search: string;
    query: string;
    pathname: string;
    path: string;
    href: string;
    _raw: string;
  }
}

export = url;
