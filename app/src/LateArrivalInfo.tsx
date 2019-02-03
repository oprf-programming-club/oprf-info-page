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
  return (
    <>
      <Panel header="Late Arrival">
        {bellSchedule ? (
          <>
            This upcoming Wednesday, {dateFns.format(next, "MMMM Do")},{" "}
            {late ? (
              <span className="yes">WILL</span>
            ) : (
              <span className="no">will NOT</span>
            )}{" "}
            be a late arrival Wednesday.
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
