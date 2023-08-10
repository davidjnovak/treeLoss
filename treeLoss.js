var worldCover = ee.ImageCollection('ESA/WorldCover/v100').first();
var gfc2020 = ee.Image('UMD/hansen/global_forest_change_2021_v1_9');
var landscapeChange = ee.ImageCollection('USFS/GTAC/LCMS/v2021-7');
var lossyear = gfc.select("lossyear");

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

var pellet_collection = ee.FeatureCollection(pellet_plants);

var region = ee.Geometry.Polygon([
  [-77.90757649680197, 35.30679030719262],
  [-77.89783471365988, 35.301711974293504],
  [-77.89422982474386, 35.30465394391733],
  [-77.90431493063986, 35.31330411579906],
  [-77.90757649680197, 35.30679030719262]
]);

var areaSqMeters = region.area();
var areaAcres = areaSqMeters.multiply(0.000247105);

print('Area: ', areaAcres);

var regionImage = ee.Image().paint({
  featureCollection: ee.FeatureCollection([ee.Feature(region)]),
  color: "purple",
  width: 3
});

var cutArea = regionImage.paint(region, 'purple');

function addLossLayer(startYear, endYear) {
  var mask = lossyear.gte(startYear - 2000).and(lossyear.lte(endYear - 2000));
  var maskedImage = gfc.updateMask(mask);
  Map.addLayer(maskedImage, {bands: ['loss'], max: 1, palette: ['red']}, "Loss " + startYear + "-" + endYear);
}

addLossLayer(2017, 2019);

Map.addLayer(cutArea, {}, 'Region');

Map.addLayer(worldCover, {
    bands: ['Map']
}, 'WorldCover');

var treeCoverViz = {
    bands: ['treecover2000'],
    min: 0,
    max: 100,
    palette: ['black', 'green']
};
Map.addLayer(gfc2020, treeCoverViz, 'Hansen 2000 Tree Cover');

var treeLossYearViz = {
    bands: ['lossyear'],
    min: 0,
    max: 21,
    palette: ['yellow', 'red']
};


Map.addLayer(pellet_collection, {}, "Wood Pellet Plants")
Map.addLayer(gfc2020, treeLossYearViz, '2000-2020 Year of Loss');
