# leaflet_challenge
Earthquake Visualization with Leaflet.js

# Overview

This project utilizes Leaflet.js to visualize earthquake data provided by the United States Geological Survey (USGS). The data is fetched in GeoJSON format and plotted on an interactive map. The visualization enhances comprehension of earthquake distribution, magnitude, and depth.

# Dataset

The earthquake data is retrieved from the USGS GeoJSON Feed:

The data includes longitude, latitude, magnitude, and depth information.

The depth is represented as the third coordinate in the dataset.

# Optional Dataset

Tectonic Plate Boundaries: Additional dataset obtained from GitHub - fraxen/tectonicplates to show plate boundaries alongside earthquake occurrences.

# Features

# Part 1: Earthquake Visualization

# Interactive Map:

Uses Leaflet.js to plot all earthquake occurrences.

Data markers are scaled based on earthquake magnitude.

Depth of the earthquake is represented by marker color intensity.

# Popups:

Clicking on a marker displays additional earthquake details such as location, magnitude, and depth.

# Legend:

A legend is included to indicate depth color variations.

# Part 2: Additional Enhancements (Optional)

# Tectonic Plate Overlay:

Visualizes tectonic plate boundaries on the map.

# Base Maps:

Multiple base maps (e.g., satellite, street, terrain) for better visualization.

# Layer Controls:

Enables toggling between earthquake data and tectonic plates.

Technologies Used

JavaScript

Leaflet.js

D3.js (for fetching and processing JSON data)

GeoJSON (earthquake dataset format)

HTML & CSS (for map styling and structure)

Setup Instructions

# Clone the repository:

git clone <repository_url>

Navigate to the project directory:

cd Module15-Earthquake-Visualization

Open index.html in a browser.

