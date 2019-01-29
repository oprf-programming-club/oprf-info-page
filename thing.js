const Agent = require("agentkeepalive");
const got = require("got").extend({
  agent: {
    http: new Agent(),
    https: new Agent.HttpsAgent()
  }
});
const ntlm = require("ntlm");

const pass = fs.readFileSync("pass", "utf8");

const challengeHeader = (hostname, domain) =>
  "NTLM " + ntlm.encodeType1(hostname, domain).toString("base64");

const responseHeader = (res, hostname, domain, username, password) => {
  const serverNonce = Buffer.from(
    (res.headers["www-authenticate"].match(/^NTLM\s+(.+?)(,|\s+|$)/) || [])[1],
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

got("https://intranet.oprfhs.org", {
  throwHttpErrors: false,
  headers: {
    Authorization: challengeHeader("intranet.oprfhs.org", "OPRFAD")
  }
}).then(res => {
  global.res1 = res;
  const Authorization = responseHeader(
    res,
    "intranet.oprfhs.org",
    "OPRFAD",
    "noxer11",
    pass
  );
  console.log(Authorization);
  got("https://intranet.oprfhs.org/Pages/default.aspx", {
    throwHttpErrors: false,
    headers: {
      Authorization
    }
  }).then(res => {
    global.res2 = res;
  });
});
