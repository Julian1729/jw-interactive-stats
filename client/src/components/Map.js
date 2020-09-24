import React, { useContext } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import _ from "lodash";

import countries from "../countries.json";
import { CountryContext } from "./CountryProvider";

// Create map instance
var chart = am4core.create("js-globe", am4maps.MapChart);

chart.panBehavior = "rotateLongLat";

// hide logo
chart.logo.height = -15;

// Set map definition
chart.geodata = am4geodata_worldLow;

chart.padding(20, 20, 20, 20);

// chart.moveTo(2);

// Set projection
chart.projection = new am4maps.projections.Orthographic();

// Create map polygon series
var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
worldSeries.useGeodata = true;

worldSeries.data = countries;

// Configure series
var polygonTemplate = worldSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#2256CA");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");

chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
  "#579cdb"
);
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

let animation = null;
const focusCountry = id => {
  const polygon = worldSeries.getPolygonById(id);
  chart.zoomToMapObject(polygon, 2, true, 2000);

  // if (animation) {
  //   animation.stop();
  // }
  // animation = chart.animate(
  //   [
  //     {
  //       property: "deltaLongitude",
  //       to: Math.floor(polygon.longitude)
  //     },
  //     {
  //       property: "deltaLatitude",
  //       to: Math.floor(polygon.latitude)
  //     }
  //   ],
  //   2000
  // );
};

animation = chart.animate(
  [
    {
      property: "deltaLongitude",
      to: 180
    }
  ],
  30000
);

polygonTemplate.events.on("hit", function(polygon) {
  focusCountry(polygon.target.dataItem.dataContext.id);
});

const Map = () => {
  const [country, setCountry] = useContext(CountryContext);

  polygonTemplate.events.on("hit", function(ev) {
    setCountry(() =>
      _.pick(ev.target.dataItem.dataContext, ["id", "name", "stats", "jwURL"])
    );
  });

  return <div id="js-globe" className="map-container"></div>;
};

export default Map;
