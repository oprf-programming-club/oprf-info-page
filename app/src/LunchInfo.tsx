import React, { FunctionComponent, Fragment } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { LunchMenu } from "./api";

interface LunchInfoProps {
  lunchMenu: LunchMenu[] | undefined;
}

const template = (rowData, column) => {
  return (
    rowData &&
    rowData[column.field].split("\n").map((item, key) => (
      <Fragment key={key}>
        {item}
        <br />
      </Fragment>
    ))
  );
};

const LunchInfo: FunctionComponent<LunchInfoProps> = ({ lunchMenu }) => (
  <DataTable header="Lunch Menu" value={[lunchMenu]}>
    <Column field="0" body={template} header="Monday" />
    <Column field="1" body={template} header="Tuesday" />
    <Column field="2" body={template} header="Wednesday" />
    <Column field="3" body={template} header="Thursday" />
    <Column field="4" body={template} header="Friday" />
  </DataTable>
);

export default LunchInfo;
