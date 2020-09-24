import React, { useContext, useEffect } from "react";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import _ from "lodash";
import * as d3 from "d3";
import * as topojson from "topojson-client";

import countries from "../countries.json";
import { CountryContext } from "./CountryProvider";

const Map = () => {
  const [country, setCountry] = useContext(CountryContext);

  useEffect(() => {
    let width = d3
      .select("#js-globe")
      .node()
      .getBoundingClientRect().width;

    let height = 500;
    const sensitivity = 75;

    let projection = d3
      .geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2]);

    const initialScale = projection.scale();
    let path = d3.geoPath().projection(projection);

    let svg = d3
      .select("#js-globe")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    let globe = svg
      .append("circle")
      .attr("fill", "#2F84DF")
      .attr("stroke", "#000")
      .attr("stroke-width", "0.2")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", initialScale);

    svg
      .call(
        d3.drag().on("drag", () => {
          const rotate = projection.rotate();
          const k = sensitivity / projection.scale();
          projection.rotate([
            rotate[0] + d3.event.dx * k,
            rotate[1] - d3.event.dy * k
          ]);
          path = d3.geoPath().projection(projection);
          svg.selectAll("path").attr("d", path);
        })
      )
      .call(
        d3.zoom().on("zoom", () => {
          if (d3.event.transform.k > 0.3) {
            projection.scale(initialScale * d3.event.transform.k);
            path = d3.geoPath().projection(projection);
            svg.selectAll("path").attr("d", path);
            globe.attr("r", projection.scale());
          } else {
            d3.event.transform.k = 0.3;
          }
        })
      );

    let map = svg.append("g");

    d3.json(
      "https://raw.githubusercontent.com/michael-keith/mps_interests/master/view/js/charts/data/world_map.json",
      function(err, d) {
        map
          .append("g")
          .attr("class", "countries")
          .selectAll("path")
          .data(d.features)
          .enter()
          .append("path")
          .attr("class", d => "country_" + d.properties.name.replace(" ", "_"))
          .attr("d", path)
          .attr("fill", "#1B41BC")
          .style("stroke", "#fff")
          .style("stroke-width", 0.1);
        // .style("opacity", 0.8);
      }
    );

    //Optional rotate
    d3.timer(function(elapsed) {
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      projection.rotate([rotate[0] - 1 * k, rotate[1]]);
      path = d3.geoPath().projection(projection);
      svg.selectAll("path").attr("d", path);
    }, 200);
  });

  return <div id="js-globe" className="map-container"></div>;
};

export default Map;
