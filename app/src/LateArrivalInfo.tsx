import React, { FunctionComponent } from "react";
import { BellSchedule } from "./api";
import { Panel } from "primereact/panel";
import { ProgressBar } from "primereact/progressbar";
import dateFns from "date-fns";
import { isLateWed, nextWed } from "lib/utils";

interface LateArrivalInfoProps {
  bellSchedule: BellSchedule | undefined;
}

const LateArrivalInfo: FunctionComponent<LateArrivalInfoProps> = ({
  bellSchedule
}) => {
  const next = nextWed();
  const late = bellSchedule && isLateWed(bellSchedule, next);
  const todayLate = dateFns.isToday(next);
  return (
    <>
      <Panel header="Late Arrival">
        {bellSchedule ? (
          <>
            {todayLate ? "Today, " : "This upcoming Wednesday, "}
            {dateFns.format(next, "MMMM Do, ")}
            {late ? (
              <span className="yes">{todayLate ? "IS" : "WILL"} </span>
            ) : (
              <span className="no">{todayLate ? "is NOT" : "will NOT"} </span>
            )}
            {!todayLate && "be "}a late arrival Wednesday.
          </>
        ) : (
          <ProgressBar mode="indeterminate" />
        )}
      </Panel>
      <style jsx>{`
        .yes {
          color: rgb(33, 155, 33);
        }

        .no {
          color: rgb(204, 29, 29);
        }

        .yes,
        .no {
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default LateArrivalInfo;
