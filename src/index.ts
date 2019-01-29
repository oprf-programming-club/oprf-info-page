import dust from "dustjs-linkedin";
const tmpl = require("../templates/index")(dust);
import * as api from "./api";
import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";

const pass = fs.readFileSync("./pass", "utf8");

const index = (_req: IncomingMessage, res: ServerResponse) => {
  const bellSchedule = api.bellSchedule();
  bellSchedule.then(a => console.log(JSON.stringify(a)))

  const lunchMenu = api.lunchMenu("noxer11", pass);
  dust
    .stream(tmpl, {
      bells: bellSchedule,
      lunch: lunchMenu
    })
    .pipe(res as any);
};

export default index;
