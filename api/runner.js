const { default: index, DEFAULT_PORT } = require("./dist/index.js");
const http = require("http");

const port = Number(process.env.PORT) || DEFAULT_PORT;

http.createServer(index).listen(port);

console.log(`Listening on port ${port}`);
