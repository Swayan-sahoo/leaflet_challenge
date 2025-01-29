// Create the 'basemap' tile layer that will be the background of our map.
let topoLayer = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  {
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  });

// OPTIONAL: Create the 'street' tile layer as a second background of the map
let streetLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

// Create the map object with center and zoom options.
let earthquakeMap = L.map("map", {
  center: [40.7, -94.5],
  zoom: 3,
  layers: [topoLayer]  // Set default layer
});

// Create layer groups for earthquakes and tectonic plates.
let earthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();

// Create a baseMaps object to hold the tile layers.
let baseMaps = {
  "Topographic": topoLayer,
  "Street Map": streetLayer,
};

// Create an overlay object to hold the earthquake and tectonic plates data.
let overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates,
};

// Add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(earthquakeMap);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: determineColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: calculateRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  function determineColor(depth) {
    switch (true) {
      case depth > 90:
        return "#ea2c2c";
      case depth > 70:
        return "#ea822c";
      case depth > 50:
        return "#ee9c00";
      case depth > 30:
        return "#eecc00";
      case depth > 10:
        return "#d4ee00";
      default:
        return "#98ee00";
    }
  }
  function calculateRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4;
  }

  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Magnitude: " + feature.properties.mag +
        "<br>Depth: " + feature.geometry.coordinates[2] +
        "<br>Location: " + feature.properties.place
      );
    }
  }).addTo(earthquakes);

  earthquakes.addTo(earthquakeMap);

  // Create a legend control object.
  let mapLegend = L.control({ position: "bottomright" });

  mapLegend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let depthRanges = [-10, 10, 30, 50, 70, 90];
    let depthColors = [
      "#a3f600", 
      "#dcf400", 
      "#f7db11", 
      "#fdb72a", 
      "#fca35d", 
      "#ff5f65"
    ];

    for (let i = 0; i < depthRanges.length; i++) {
      div.innerHTML += "<i style='background: " + depthColors[i] + "'></i> " +
        depthRanges[i] + (depthRanges[i + 1] ? "&ndash;" + depthRanges[i + 1] + "<br>" : "+");
    }
    return div;
  };
  

  mapLegend.addTo(earthquakeMap);
});

// OPTIONAL: Make a request to get our Tectonic Plate geoJSON data.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
  L.geoJson(plate_data, {
    color: "orange",
    weight: 2
  }).addTo(tectonicPlates);

  tectonicPlates.addTo(earthquakeMap);
});
