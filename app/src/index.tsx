import React, { Suspense } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import ReactDOM from "react-dom";
import stylesProm from "./styles";
import { apiPath } from "./api";

const App = React.lazy(async () => {
  // Start the `App` import
  const appProm = import("./App");
  // But only return once all of the stylesheets have loaded
  await stylesProm;
  return appProm;
});

// The spinner to show while everything's loading
const fallbackElem = (
  <div className="p-grid p-align-center p-justify-center full-dim">
    <div className="p-col text-center">
      <ProgressSpinner />
    </div>
  </div>
);

ReactDOM.render(
  <Suspense fallback={fallbackElem}>
    <App />
  </Suspense>,
  document.getElementById("app")
);

// "Analytics"
if (process.env.NODE_ENV === "production") {
  const url = new URL(apiPath("analytics"), location.href);
  url.searchParams.set("date", new Date().toDateString());
  fetch(url.href).catch(console.error);
}
