// Import the ESA WorldCover dataset.
var gfc2020 = ee.Image('UMD/hansen/global_forest_change_2021_v1_9');

var change2021 = landscapeChange
    .filter(ee.Filter.and(
      ee.Filter.eq('year', 2021),  // range: [1985, 2021]
      ee.Filter.eq('study_area', 'CONUS')  // or 'SEAK'
    ))

// Add the 2000 tree cover image to the map.
Map.addLayer(gfc2020, treeCoverViz, 'Hansen 2000 Tree Cover');

// Create a visualization for the year of tree loss over the past 20 years.
var treeLossYearViz = {
    bands: ['lossyear'],
    min: 0,
    max: 21,
    palette: ['yellow', 'red']
};

// Create a custom visualization for the change2021 layer.
Map.addLayer(gfc2020, treeLossYearViz, '2000-2020 Year of Loss');
