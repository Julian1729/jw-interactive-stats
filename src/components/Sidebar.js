import React, { useContext } from "react";
import _ from "lodash";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// import countries from "../countries.json";
import { CountryContext } from "./CountryProvider";

const Sidebar = () => {
  const [country, setCountry] = useContext(CountryContext);

  return (
    <aside className="sidebar">
      <h1>
        Jehovah's Witnesses <br /> Worldwide Statistics
      </h1>
      {_.isEmpty(country) && (
        <h2 className="sidebar__instructions">Select a Country</h2>
      )}

      {!_.isEmpty(country) && (
        <>
          <h2
            className={`sidebar__country-name ${!country.stats && 'sidebar__country-name--nostats'}`}
            onClick={() => setCountry({})}
            >
            {country.name}{" "}
            {country.stats && (
              <FontAwesomeIcon
                className="sidebar__reset-icon"
                icon={faTimesCircle}
              />
            )}
          </h2>
          {country.stats && (
            <>
              <ul className="sidebar__stats">
                <li className="sidebar__ministers">
                  <span className="sidebar__stat-value">
                    <CountUp delay={0.30} separator={","} end={country.stats.ministers} />
                  </span>
                  <span className="sidebar__stat-title">Ministers</span>
                </li>
                <li className="sidebar__congregations">
                  <span className="sidebar__stat-value">
                    <CountUp
                      delay={0.60}
                      separator={","}
                      end={country.stats.congregations}
                    />
                  </span>
                  <span className="sidebar__stat-title">Congregations</span>
                </li>
                <li className="sidebar__populations">
                  <span className="sidebar__stat-value">
                    <CountUp delay={0.90} separator={","} end={country.stats.population} />
                  </span>
                  <span className="sidebar__stat-title">Population</span>
                </li>
                <li className="sidebar__ratio">
                  <span className="sidebar__stat-value">
                    1 / <CountUp delay={1} separator={","} end={country.stats.ratio} />
                  </span>
                  <span className="sidebar__stat-title">Publisher Ratio</span>
                </li>
              </ul>
              <a
                href={country.jwURL}
                target="_blank"
                className="sidebar__jwlink"
              >
                All information taken from www.jw.org. <FontAwesomeIcon className="sidebar__jwlink__icon" icon={faChevronRight} />
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
                  No statistics found for this country.
                  <br />
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
