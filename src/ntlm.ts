import ntlm from "ntlm";
import { Response } from "got";

export const challengeHeader = (hostname: string, domain: string) =>
  "NTLM " + ntlm.encodeType1(hostname, domain).toString("base64");

export const responseHeader = (
  res: Response<any>,
  hostname: string,
  domain: string,
  username: string,
  password: string
) => {
  const serverNonce = Buffer.from(
    (res.headers["www-authenticate"]!.match(/^NTLM\s+(.+?)(,|\s+|$)/) || [])[1],
    "base64"
  );
  return (
    "NTLM " +
    ntlm
      .encodeType3(
        username,
        hostname,
        domain,
        ntlm.decodeType2(serverNonce),
        password
      )
      .toString("base64")
  );
};
