import React from "react";
import Header from "./Header";
import { bellSchedule, lunchMenu, analytics } from "./api";
import Bells from "./Bells";
import LateArrivalInfo from "./LateArrivalInfo";
import { useMedia } from "use-media";
import LunchInfo from "./LunchInfo";
import { usePromise } from "./utils";
import dateFns from "date-fns";
import { periodForTime } from "lib/utils"

const App = () => {
  const bells = usePromise(() => bellSchedule().then(bells => {
    if (process.env.NODE_ENV === "production") {
      analytics(periodForTime(bells));
    }
    return bells;
  }));
  const lunch = usePromise(lunchMenu);

  const small = useMedia("(max-width: 600px)");

  return (
    <div>
      <Header>OPRF Info Page</Header>
      <Header size={4}>{dateFns.format(new Date(), "dddd, MMMM Do")}</Header>
      <div className="p-grid">
        <div className={small ? "p-col-12" : "p-col-5"}>
          <Bells bellSchedule={bells} />
        </div>
        <div className="p-col">
          <div className="p-grid p-dir-col">
            <div className="p-col">
              <LateArrivalInfo bellSchedule={bells} />
            </div>
            <div className="p-col">
              <LunchInfo lunchMenu={lunch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
