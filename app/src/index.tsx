import React, { Suspense, FunctionComponent } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import ReactDOM from "react-dom";
import stylesProm from "./styles";
import { usePromise } from "./utils";
import {
  lunchMenu,
  analytics,
  bellSchedule,
  BellSchedule,
  LunchMenu,
  periodForTime
} from "./api";

const App = React.lazy(async () => {
  // Start the `App` import
  const appProm = import("./App");
  // But only return once all of the stylesheets have loaded
  await stylesProm;
  return appProm;
});

const Root: FunctionComponent = () => {
  const bells = usePromise(bellSchedule, {
    then: bells => {
      if (process.env.NODE_ENV === "production") {
        analytics(periodForTime(bells));
      }
    }
  });
  const lunch = usePromise(lunchMenu);

  const fallbackElem = (
    <div className="p-grid p-align-center p-justify-center full-dim">
      <div className="p-col text-center">
        <ProgressSpinner />
      </div>
    </div>
  );
  return (
    /* <Suspense fallback={fallbackElem}> */
    /*   <App {...{ bells, lunch }} /> */
    /* </Suspense> */
    <div className="p-grid p-align-center p-justify-center full-dim">
      <div className="p-col text-center" style={{ fontSize: '30px' }}>
        SCHOOL'S GONE FOREVER
      </div>
    </div>
  );
};

// The spinner to show while everything's loading

ReactDOM.render(<Root />, document.getElementById("app"));
