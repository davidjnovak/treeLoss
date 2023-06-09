// Import the ESA WorldCover dataset.
var gfc2020 = ee.Image('UMD/hansen/global_forest_change_2021_v1_9');

var pellet_plants = [
ee.Feature(ee.Geometry.Point(-91.8720, 32.9559), {description: "Morehouse Bioenergy"}),
ee.Feature(ee.Geometry.Point(-91.0377, 31.1849), {description: "Amite Bioenergy"}),
ee.Feature(ee.Geometry.Point(-92.2792, 31.8785), {description: "LaSalle Bioenergy"}),
ee.Feature(ee.Geometry.Point(-88.5503, 30.9188), {description: "Enviva Lucedale"}),
ee.Feature(ee.Geometry.Point(-82.4114, 31.2565), {description: "Enviva Waycross"}),
ee.Feature(ee.Geometry.Point(-77.6114, 36.5051), {description: "Enviva Northampton"}),
ee.Feature(ee.Geometry.Point(-76.9721, 36.6534), {description: "Enviva Southampton"}),
ee.Feature(ee.Geometry.Point(-85.3911, 30.7401), {description: "Enviva Cottondale"}),
ee.Feature(ee.Geometry.Point(-78.1839, 35.1210), {description: "Enviva Sampson"}),
ee.Feature(ee.Geometry.Point(-79.6379, 34.9337), {description: "Enviva Hamlet"}),
ee.Feature(ee.Geometry.Point(-82.0634, 34.2290), {description: "Enviva Greenwood"}),
ee.Feature(ee.Geometry.Point(-76.9656, 36.2690), {description: "Enviva Ahoskie"}),
ee.Feature(ee.Geometry.Point(-88.4951, 33.9883), {description: "Enviva Amory"}),
ee.Feature(ee.Geometry.Point(-82.5730, 31.8543), {description: "Fram Hazlehurst"}),
ee.Feature(ee.Geometry.Point(-82.4656, 31.8167), {description: "Fram Appling"}),
ee.Feature(ee.Geometry.Point(-81.9555, 31.2103), {description: "Fram Archer"}),
ee.Feature(ee.Geometry.Point(-82.6795, 31.9227), {description: "Fram Telfair"}),
ee.Feature(ee.Geometry.Point(-92.0671, 34.2655), {description: "Highland Pine Bluff"}),
ee.Feature(ee.Geometry.Point(-88.2442, 33.0764), {description: "Pinnacle - Aliceville"}),
ee.Feature(ee.Geometry.Point(-87.9591, 32.4664), {description: "Alabama Pellets Demopolis"}),
ee.Feature(ee.Geometry.Point(-88.7340, 32.0457), {description: "MRE Quitman"}),
ee.Feature(ee.Geometry.Point(-85.6264, 35.0713), {description: "MRE Jasper"}),
ee.Feature(ee.Geometry.Point(-86.0369, 34.2760), {description: "MRE Crossville"}),
ee.Feature(ee.Geometry.Point(-94.4322, 30.7424), {description: "Woodville Pellets"}),
ee.Feature(ee.Geometry.Point(-82.3404, 32.5301), {description: "LJR Forest Products"})
];

var change2021 = landscapeChange
    .filter(ee.Filter.and(
      ee.Filter.eq('year', 2021),  // range: [1985, 2021]
      ee.Filter.eq('study_area', 'CONUS')  // or 'SEAK'
    ))

// Create a visualization for tree cover in 2000.
var treeCoverViz = {
    bands: ['treecover2000'],
    min: 0,
    max: 100,
    palette: ['black', 'green']
};
// Create a visualization for the year of tree loss over the past 20 years.
var treeLossYearViz = {
    bands: ['lossyear'],
    min: 0,
    max: 21,
    palette: ['yellow', 'red']
};

// Add the 2000 tree cover image to the map.
Map.addLayer(gfc2020, treeGainYearViz, "gain");
Map.addLayer(change2021, {}, 'Change 2021');
Map.addLayer(change2010, {}, 'Change 2010');
Map.addLayer(pellet_collection, {}, "Wood Pellet Plants")
Map.addLayer(gfc2020, treeLossYearViz, '2000-2020 Year of Loss');

