const http = require("http");
const cp = require("child_process");
const stream = require("stream");
const fs = require("fs");
const mime = require("mime-types");

const clearCache = () => {
  for (const moduleId of Object.keys(require.cache)) {
    delete require.cache[moduleId];
  }
};

let index;

const compile = () => {
  clearCache();

  console.log("Compiling...");

  cp.spawnSync("yarn", ["now-build"]);

  index = require("./src/entry");

  console.log("Done");
};

if (process.argv[2] === "once") {
  compile();
  const res = new stream.Writable()
  index(null, res);
  res.on("close", () => process.exit())
} else {
  http
    .createServer((req, res) => {
      const { url } = req;
      if (url === "/") {
        compile();
        index(req, res);
      } else {
        const path = __dirname + "/static" + url;
        res.setHeader(
          "Content-Type",
          mime.lookup(path) || "application/octet-stream"
        );
        fs.createReadStream(path)
          .on("error", () => {
            res.statusCode = 404;
            res.end();
          })
          .pipe(res);
      }
    })
    .listen(3000);
}
