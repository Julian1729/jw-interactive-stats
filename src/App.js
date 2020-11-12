import React from "react";

import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Foreground from "./components/Foreground";
import { CountryProvider } from "./components/CountryProvider";

const App = () => (
  <CountryProvider>
    <div className="wrapper">
      <Map />
      <Sidebar />
      <Foreground />
      <Footer />
    </div>
  </CountryProvider>
);

export default App;
