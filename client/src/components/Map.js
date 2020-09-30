import React, { useContext, useEffect } from "react";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import _ from "lodash";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import countryCodes from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

import countries from "../countries.json";
import { CountryContext } from "./CountryProvider";
countryCodes.registerLocale(enLocale);

const Map = () => {
  const [country, setCountry] = useContext(CountryContext);

  useEffect(() => {
    let width = d3
      .select("#js-globe")
      .node()
      .getBoundingClientRect().width;
    let height = d3
      .select("#js-globe")
      .node()
      .getBoundingClientRect().height;

    const timerCallback = elapsed => {
      const rotate = projection.rotate();
      const k = autoSensitivity / projection.scale();
      projection.rotate([rotate[0] - 1 * k, rotate[1]]);
      path = d3.geoPath().projection(projection);
      svg.selectAll("path").attr("d", path);
    };

    //Optional rotate
    const rotateTimer = d3.timer(timerCallback, 200);

    // let height = 500;
    const sensitivity = 75;
    const autoSensitivity = 30;

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
      .attr("id", "circle")
      .attr("fill", "#2F84DF")
      // .attr("stroke", "none")
      // .attr("stroke-width", "0.2")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", initialScale);

    //Container for the gradients
    var defs = svg
      .append("defs")
      .attr("fill", "none")
      .attr("stroke", "#fff");

    // Filter for the  outside glow
    var filter = defs.append("filter").attr("id", "glow");
    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "10")
      .attr("result", "coloredBlur");
    filter
      .append("feFlood")
      .attr("flood-color", "#fff")
      .attr("result", "color");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    d3.selectAll("#circle").style("filter", "url(#glow)");

    var rotateTimeout = null;

    svg
      .call(
        d3.drag().on("drag", () => {
          clearTimeout(rotateTimeout);
          rotateTimer.stop();
          rotateTimeout = setTimeout(() => {
            rotateTimer.restart(timerCallback);
          }, 3000);
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
          .attr("data-alpha2", d => {
            const alpha2Code = countryCodes.alpha3ToAlpha2(d.id);
            d.alpha2 = alpha2Code;
            // find country by id
            const countryData = _.find(countries, ["id", alpha2Code]);
            d.countryData = countryData;
          })
          .attr("d", path)
          .attr("fill", "#1B41BC")
          .transition()
          .duration("300")
          .style("stroke", "#fff")
          .style("stroke-width", 0.1);
        // .style("opacity", 0.8);
        const countryPaths = map.selectAll("path");
        countryPaths
          .on("click", function(a) {
            if (!a.countryData) {
              console.log(`No data for ${a.properties.name}`);
              // return console.log(`No data for ${a.properties.name}`);
            }
            rotateTimer.stop();
            // get alpha 2 id
            setCountry(
              prevCountry => a.countryData || { name: a.properties.name }
            );
          })
          .on("mouseover", function() {
            d3.select(this)
              .attr("opacity", 0.7)
              .style("stroke-width", 0.5);
          })
          .on("mouseout", function() {
            d3.select(this)
              .attr("opacity", 1)
              .style("stroke-width", 0.1);
          });
      }
    );
  }, [setCountry]);

  return <div id="js-globe" className="map-container"></div>;
};

export default Map;
