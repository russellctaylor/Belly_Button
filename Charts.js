function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
};

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sample_value = data.samples;
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sample_value_Array = sample_value.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = sample_value_Array[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var id = result.otu_ids;
    var labels = result.otu_labels;
    var values= result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = id.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();


    // 8. Create the trace for the bar chart. 
    var bar_data = [{
      x: values.slice(0,10).reverse(),
      y: yticks,
      text: labels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h'
      
    }];
    // 9. Create the layout for the bar chart. 
    var bar_layout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', bar_data, bar_layout)
  
  
  
  
    

// Bar and Bubble charts
// Create the buildCharts function.
//function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  //d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    //Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var bubble_data = [{
      x : id,
      y : values,
      
      text : labels,
     
      mode : 'markers',
      
      marker : {
        color : id,
        size: values,
        colorscale: 'Jet'
      } 
      
    }];

    // 2. Create the layout for the bubble chart.
    var bubble_layout = {
      title: "<b>Bacteria Cultures Per Sample</b>",
          
      xaxis: { title: "OTU IDs" },
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble',bubble_data, bubble_layout ); 
  
  
    // Create a variable that holds the samples array. 
    
    // Create a variable that filters the samples for the object with the desired sample number.
    var meta_data = data.metadata;
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    
    
    var meta_data_array = meta_data.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    

    // 2. Create a variable that holds the first sample in the metadata array.
  var results_1 = meta_data_array[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
  var wash_freq = parseFloat(results_1.wfreq);
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    //Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    //Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gauge_data = [{
      domain: { x: [0,1], y: [0,1]},
      value: wash_freq,
      title: { text: "<b>Belly Button Washing Frequency</b> : <i>Scrubs per Week</i>" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        bar: {color:'black'},
        axis: {range:[0, 10]},
        steps: [
            { range: [0,2], color: 'red' },
            { range: [2,4], color: 'orange' },
            { range: [4,6], color: 'yellow' },
            { range: [6,8], color: 'yellowgreen'},
            { range: [8,10], color: 'green'}
        ],
    }}
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gauge_layout = { width: 575, height: 500, margin: { t: 0, b: 0 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gauge_data, gauge_layout);
  });
};
  
  
  
  
  
  
  
  
  
  
  





