import "./preloaded";

const split = import("./split").catch(err => {
  console.error("Failed to load split-off style sheets", err);
});

export default split;
