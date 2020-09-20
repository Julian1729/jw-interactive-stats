import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import countries from "./countries.json";

import "./App.css";

// Create map instance
var chart = am4core.create("js-globe", am4maps.MapChart);

chart.panBehavior = "rotateLongLat";

// hide logo
chart.logo.height = -15;

// Set map definition
chart.geodata = am4geodata_worldLow;

chart.padding(20, 20, 20, 20);

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

// Zoom in on click
polygonTemplate.events.on("hit", function(ev) {
  // TODO: spin globe center to this country
  ev.target.series.chart.zoomToMapObject(ev.target);
  console.log(ev.target.dataItem.dataContext);
});

// var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
// graticuleSeries.mapLines.template.line.stroke = am4core.color("#67b7dc");
// graticuleSeries.mapLines.template.line.strokeOpacity = 0.2;
// graticuleSeries.fitExtent = false;

chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
  "#579cdb"
);
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

function App() {
  return (
    <div className="App">
      <div id="js-globe" className="globe-container"></div>
    </div>
  );
}

export default App;
