import React from "react";

import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import { CountryProvider } from "./components/CountryProvider";

const App = () => (
  <CountryProvider>
    <div className="wrapper">
      <Map />
      <Sidebar />
      <div className="foreground">
        <div id="stars"></div>
      </div>
    </div>
  </CountryProvider>
);

export default App;
