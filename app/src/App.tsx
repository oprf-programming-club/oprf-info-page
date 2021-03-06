import React, { FunctionComponent } from "react";
import Header from "./Header";
import { bellSchedule, lunchMenu, analytics, periodForTime, BellSchedule, LunchMenu } from "./api";
import Bells from "./Bells";
import LateArrivalInfo from "./LateArrivalInfo";
import { useMedia } from "use-media";
import LunchInfo from "./LunchInfo";
import dateFns from "date-fns";

interface AppProps {
  bells?: BellSchedule, 
  lunch?: LunchMenu
}

const App: FunctionComponent<AppProps> = ({ bells, lunch }) => {
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
