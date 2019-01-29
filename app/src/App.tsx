import React, { useState, useEffect } from "react";
import Header from "./Header";
import { BellSchedule, bellSchedule, lunchMenu } from "./api";
import Bells from "./Bells";
import LateArrivalInfo from "./LateArrivalInfo";
import { useMedia } from "use-media";
import LunchInfo from "./LunchInfo";

const App = () => {
  const [bells, setBells] = useState<BellSchedule | undefined>(undefined);
  const [lunch, setLunch] = useState<string[] | undefined>(undefined)

  const small = useMedia("(max-width: 600px)");

  useEffect(() => {
    bellSchedule().then(bellSchedule => {
      setBells(bellSchedule);
    });
    lunchMenu().then(lunchMenu => {
      setLunch(lunchMenu)
    })
  }, []);

  return (
    <div>
      <Header>OPRF Info Page</Header>
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
