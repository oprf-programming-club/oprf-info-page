import React, { FunctionComponent } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BellSchedule } from "./api";
import css from "styled-jsx/css";

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

  const { className: numClass, styles } = css.resolve`
    * {
      width: 20%; 
    }
  `;

  return (
    <>
      <DataTable value={periods} header="Bell Schedule" className="text-center">
        <Column field="num" header="Period #" className={numClass} />
        <Column field="normal" header="Normal Times" />
        <Column field="lateArrival" header="Late Arrival Times" />
      </DataTable>
      {styles}
    </>
  );
};

export default Bells;
