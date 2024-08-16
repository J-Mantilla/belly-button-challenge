// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // get the metadata field
    let metadataArray = data.metadata;
  
    // Filter the metadata for the object with the desired sample number
    let sampleMetadata = metadataArray.find(item => item.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(sampleMetadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samplesArray = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleData = samplesArray.find(item => item.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = sampleData.otu_ids;
    let otuLabels = sampleData.otu_labels;
    let sampleValues = sampleData.sample_values;

    // Build a Bubble Chart
    let bubbleTrace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds
      }
    };

    let bubbleData = [bubbleTrace];

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {
        title: "OTU ID"
      },
      yaxis: {
        title: "Number of Bacteria"
      },
      showlegend: false,
      height: 600,
      width: 1200
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yTicks = otuIds.map(id => `OTU ${id}`);

    // Build a Bar Chart
    let barTrace = {
      x: sampleValues.slice(0,10).reverse(),
      y: yTicks.slice(0,10).reverse(),
      hovertext: otuLabels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let barData = [barTrace];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {
        title: "Number of Bacteria"
      },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;
    console.log(sampleNames)
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select option
    for (let i = 0; i < sampleNames.length; i++) 
    {
      dropdownMenu.append("option")
        .text(sampleNames[i])
        .property("value", sampleNames[i]);
    }
    // Get the first sample from the list
    let firstSampleId = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSampleId);
    buildCharts(firstSampleId);
  });
}
// Function for event listener
function optionChanged(newSampleId) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSampleId);
  buildCharts(newSampleId);
}

// Initialize the dashboard
init();