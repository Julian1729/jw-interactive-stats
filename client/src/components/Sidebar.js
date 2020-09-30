import React, { useContext } from "react";
import _ from "lodash";

// import countries from "../countries.json";
import { CountryContext } from "./CountryProvider";

const Sidebar = () => {
  const [country] = useContext(CountryContext);

  return (
    <aside className="sidebar">
      {_.isEmpty(country) && (
        <h2 className="sidebar__instructions">
          Select a Country to View its statistics
        </h2>
      )}

      {!_.isEmpty(country) && (
        <>
          <h2 className="sidebar__country-name">{country.name}</h2>
          {country.stats && (
            <>
              <ul className="sidebar__stats">
                <li className="sidebar__ministers">
                  <span className="sidebar__stat-value">
                    {country.stats &&
                      country.stats.ministers.toLocaleString("en")}
                  </span>
                  <span className="sidebar__stat-title">Ministers</span>
                </li>
                <li className="sidebar__congregations">
                  <span className="sidebar__stat-value">
                    {country.stats &&
                      country.stats.congregations.toLocaleString("en")}
                  </span>
                  <span className="sidebar__stat-title">Congregations</span>
                </li>
                <li className="sidebar__populations">
                  <span className="sidebar__stat-value">
                    {country.stats &&
                      country.stats.population.toLocaleString("en")}
                  </span>
                  <span className="sidebar__stat-title">Population</span>
                </li>
                <li className="sidebar__ratio">
                  <span className="sidebar__stat-value">
                    1 /{" "}
                    {country.stats && country.stats.ratio.toLocaleString("en")}
                  </span>
                  <span className="sidebar__stat-title">Publisher Ratio</span>
                </li>
              </ul>
              <a
                href={country.jwURL}
                target="_blank"
                className="sidebar__jwlink"
              >
                All information taken from www.jw.org
              </a>
            </>
          )}
          {!country.stats && (
            <>
              {!country.jwURL && (
                <p className="sidebar__nostats">
                  No statistics found for this country.
                </p>
              )}
              {country.jwURL && (
                <p className="sidebar__nostats">
                  No statistics found for this country.{" "}
                  <a href={country.jwURL} target="_blank">
                    Read more about {country.name} on www.jw.org.
                  </a>
                </p>
              )}
            </>
          )}
        </>
      )}
    </aside>
  );
};

export default Sidebar;
