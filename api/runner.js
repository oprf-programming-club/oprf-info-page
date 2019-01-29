const { default: index } = require("./dist/index.js");
const http = require("http");

const port = Number(process.env.PORT) || 3000;

http.createServer(index).listen(port);

console.log(`Listening on port ${port}`);
