import "./styles.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

const split = import("./split").catch(err => {
  console.error("Failed to load split-off style sheets", err);
});

export default split;
