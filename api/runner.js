const { default: index } = require("./dist/index.js");
const http = require("http");

http.createServer(index).listen(Number(process.env.PORT) || 3000);
