import React, { FunctionComponent } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BellSchedule } from "./api";
import css from "styled-jsx/css";
import datefns from "date-fns";
import cn from "classnames";
import { isLateWed } from "lib/utils";

interface BellsProps {
  bellSchedule: BellSchedule | undefined;
}

const Bells: FunctionComponent<BellsProps> = ({ bellSchedule }) => {
  const periods =
    bellSchedule &&
    bellSchedule.periods.map((bells, i) => ({
      num: i + 1,
      ...bells
    }));

  const { className, styles } = css.resolve`
    .period {
      width: 20%;
    }
    .today {
      font-weight: bold;
    }
  `;

  const late = bellSchedule && isLateWed(bellSchedule, datefns.startOfToday());
  const weekday = !datefns.isWeekend(datefns.startOfToday());

  return (
    <>
      <DataTable value={periods} header="Bell Schedule" className="text-center">
        <Column
          field="num"
          header="Period"
          className={cn(className, "period")}
        />
        <Column
          field="normal"
          header="Normal Times"
          bodyClassName={cn(className, bellSchedule && weekday && !late && "today")}
        />
        <Column
          field="lateArrival"
          header="Late Arrival Times"
          className={cn(className, bellSchedule && weekday && late && "today")}
        />
      </DataTable>
      {styles}
    </>
  );
};

export default Bells;
