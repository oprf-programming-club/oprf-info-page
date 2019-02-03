import React, { FunctionComponent, Fragment } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { LunchMenu } from "./api";
import dateFns from "date-fns";
import css from "styled-jsx/css";
import cn from "classnames";

interface LunchInfoProps {
  lunchMenu: LunchMenu | undefined;
}

const template = (rowData: LunchMenu | undefined, column: any) =>
  rowData &&
  rowData[column.field].split("\n").map((item, key) => (
    <Fragment key={key}>
      {item}
      <br />
    </Fragment>
  ));

const LunchInfo: FunctionComponent<LunchInfoProps> = ({ lunchMenu }) => {
  const day = dateFns.getDay(new Date());

  const { className, styles } = css.resolve`
    .today {
      font-weight: bold;
    }
  `;

  return (
    <>
      <DataTable header="Lunch Menu" value={[lunchMenu]}>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
          (name, i) => (
            <Column
              field={String(i)}
              body={template}
              header={name}
              key={name}
              bodyClassName={cn(className, day === i + 1 && "today")}
            />
          )
        )}
      </DataTable>
      {styles}
    </>
  );
};

export default LunchInfo;
