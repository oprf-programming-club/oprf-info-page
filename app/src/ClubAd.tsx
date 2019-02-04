import React, { FunctionComponent } from "react";
import { arrRandom } from "./utils";
import { Panel } from "primereact/panel";

const requireAd = require.context("../assets/ads");

const randomAd = (): string => requireAd(arrRandom(requireAd.keys()));

const ClubAd: FunctionComponent = () => (
  <Panel header="Club Ad">
    <img src={randomAd()} />
  </Panel>
);

export default ClubAd;
