export function challengeHeader(hostname: any, domain: any): any;
export function decodeType2(buf: any): any;
export function encodeType1(hostname: any, ntdomain: any): any;
export function encodeType3(
  username: any,
  hostname: any,
  ntdomain: any,
  nonce: any,
  password: any
): any;
export function responseHeader(
  res: any,
  url: any,
  domain: any,
  username: any,
  password: any
): any;
export namespace smbhash {
  function lmhash(is: any): any;
  function lmhashbuf(inputstr: any): any;
  function nthash(is: any): any;
  function nthashbuf(str: any): any;
}
