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

chart.moveTo(2);

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

polygonTemplate.events.on("hit", function(ev) {
  // TODO: spin globe center to this country
  console.log(ev.target.dataItem.dataContext);
  ev.target.series.chart.zoomToMapObject(ev.target, null, false, 3000);
});

const Map = () => {
  const [country, setCountry] = useContext(CountryContext);

  // Zoom in on click
  polygonTemplate.events.on("hit", function(ev) {
    setCountry(() =>
      _.pick(ev.target.dataItem.dataContext, ["id", "name", "stats", "jwURL"])
    );
  });

  return <div id="js-globe" className="map-container"></div>;
};

export default Map;
