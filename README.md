#Belly Button Challenge

## Project Overview

This project uses the D3.js library to visualize operational taxonomic units (OTUs) from biological samples. The dashboard includes interactive elements such as a dropdown menu to select samples and updates charts dynamically based on the selected sample. The app is deployed using GitHub Pages.

## Background

In this assignment, you will build an interactive dashboard to explore the Belly Button Challenge which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Features

- **Horizontal Bar Chart**: Displays the top 10 OTUs found in the selected individual.
  - **Values**: `sample_values`
  - **Labels**: `otu_ids`
  - **Hovertext**: `otu_labels`

- **Bubble Chart**: Displays all OTUs for the selected sample.
  - **X-axis**: `otu_ids`
  - **Y-axis**: `sample_values`
  - **Marker Size**: `sample_values`
  - **Marker Colors**: `otu_ids`
  - **Text Values**: `otu_labels`

- **Demographic Information Panel**: Displays the selected individual's metadata.
  - Loops through each key-value pair in the metadata and appends it to the `#sample-metadata` panel.

- **Dynamic Updates**: All plots and metadata update when a new sample is selected from the dropdown menu.
