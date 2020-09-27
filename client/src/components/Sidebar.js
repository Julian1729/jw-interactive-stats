import React, { useContext } from "react";

import countries from "../countries.json";
import { CountryContext } from "./CountryProvider";

const Sidebar = () => {
  const [country, setCountry] = useContext(CountryContext);

  return (
    <div className="sidebar">
      <h2>{country && country.name}</h2>
      <ul className="sidebar__stats">
        <li>
          Ministers: {country && country.stats && country.stats.ministers}
        </li>
        <li>
          Congregations:
          {country && country.stats && country.stats.congregations}
        </li>
        <li>
          Population: {country && country.stats && country.stats.population}
        </li>
        <li>Ratio: {country && country.stats && country.stats.ratio}</li>
      </ul>
    </div>
  );
};

export default Sidebar;
