import React from "react";

import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import { CountryProvider } from "./components/CountryProvider";

const App = () => (
  <CountryProvider>
    <div className="wrapper">
      <Map />
      <Sidebar />
    </div>
  </CountryProvider>
);

export default App;
