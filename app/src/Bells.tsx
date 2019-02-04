import React, { FunctionComponent } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BellSchedule } from "./api";
import css from "styled-jsx/css";
import dateFns, { isWeekend, isWithinRange } from "date-fns";
import cn from "classnames";
import {
  formatPeriod,
  PeriodInfo,
  periodTypeForDate,
  periodForTime
} from "lib/utils";

interface BellsProps {
  bellSchedule: BellSchedule | undefined;
}

const Bells: FunctionComponent<BellsProps> = ({ bellSchedule }) => {
  interface PeriodInfoNum extends PeriodInfo {
    num: number;
  }

  const periods =
    bellSchedule &&
    bellSchedule.periods.map(
      (period, i): PeriodInfoNum => ({
        num: i + 1,
        ...period
      })
    );

  const { className, styles } = css.resolve`
    .period {
      width: 20%;
    }
    .bold {
      font-weight: bold;
    }
  `;

  const today = dateFns.startOfToday();

  const periodType = bellSchedule && periodTypeForDate(bellSchedule, today);

  type RowData = PeriodInfoNum;
  
  const currentPeriod = bellSchedule && periodForTime(bellSchedule);

  const periodTemplate = (rowData: RowData, _column: any) => (
    <span className={cn(className, currentPeriod === rowData.num && "bold")}>
      {rowData.num}
    </span>
  );

  const bellsTemplate = (rowData: RowData, column: any) =>
    formatPeriod(rowData[column.field]);

  return (
    <>
      <DataTable value={periods} header="Bell Schedule" className="text-center">
        <Column
          field="num"
          header="Period"
          className={cn(className, "period")}
          body={periodTemplate}
        />
        <Column
          field="normal"
          header="Normal Times"
          bodyClassName={cn(className, periodType === "normal" && "bold")}
          body={bellsTemplate}
        />
        <Column
          field="lateArrival"
          header="Late Arrival Times"
          className={cn(className, periodType === "lateArrival" && "bold")}
          body={bellsTemplate}
        />
      </DataTable>
      {styles}
    </>
  );
};

export default Bells;
