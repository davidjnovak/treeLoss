var worldCover = ee.ImageCollection('ESA/WorldCover/v100').first();
var gfc = ee.Image('UMD/hansen/global_forest_change_2021_v1_9');
var landscapeChange = ee.ImageCollection('USFS/GTAC/LCMS/v2021-7');
var lossyear = gfc.select("lossyear");


var pelletPlants = [
    ee.Feature(ee.Geometry.Point(-91.8720, 32.9559), {description: "Morehouse Bioenergy", yearly_acres: 12600, open_year: ee.Date('2015-01-01')}),
    ee.Feature(ee.Geometry.Point(-91.0377, 31.1849), {description: "Amite Bioenergy", yearly_acres: 12600, open_year: ee.Date('2015-01-01')}),
    ee.Feature(ee.Geometry.Point(-92.2792, 31.8785), {description: "LaSalle Bioenergy", yearly_acres: 12600, open_year: ee.Date('2017-01-01')}),
    ee.Feature(ee.Geometry.Point(-88.5503, 30.9188), {description: "Enviva Lucedale", yearly_acres: 33600, open_year: ee.Date('2022-01-01')}),
    ee.Feature(ee.Geometry.Point(-82.4114, 31.2565), {description: "Enviva Waycross", yearly_acres: 19200, open_year: ee.Date('2011-01-01')}),
    ee.Feature(ee.Geometry.Point(-77.6114, 36.5051), {description: "Enviva Northampton", yearly_acres: 18000, open_year: ee.Date('2013-01-01')}),
    ee.Feature(ee.Geometry.Point(-76.9721, 36.6534), {description: "Enviva Southampton", yearly_acres: 17880, open_year: ee.Date('2015-01-01')}),
    ee.Feature(ee.Geometry.Point(-85.3911, 30.7401), {description: "Enviva Cottondale", yearly_acres: 17520, open_year: ee.Date('2008-01-01')}),
    ee.Feature(ee.Geometry.Point(-78.1839, 35.1210), {description: "Enviva Sampson", yearly_acres: 14400, open_year: ee.Date('2016-01-01')}),
    ee.Feature(ee.Geometry.Point(-79.6379, 34.9337), {description: "Enviva Hamlet", yearly_acres: 14400, open_year: ee.Date('2019-01-01')}),
    ee.Feature(ee.Geometry.Point(-82.0634, 34.2290), {description: "Enviva Greenwood", yearly_acres: 14400, open_year: ee.Date('2018-01-01')}),
    ee.Feature(ee.Geometry.Point(-76.9656, 36.2690), {description: "Enviva Ahoskie", yearly_acres: 14400, open_year: ee.Date('2011-01-01')}),
    ee.Feature(ee.Geometry.Point(-88.4951, 33.9883), {description: "Enviva Amory", yearly_acres: 2880, open_year: ee.Date('2010-01-01')}),
    ee.Feature(ee.Geometry.Point(-82.5730, 31.8543), {description: "Fram Hazlehurst", yearly_acres: 12000, open_year: ee.Date('2021-01-01')}),
    ee.Feature(ee.Geometry.Point(-82.4656, 31.8167), {description: "Fram Appling", yearly_acres: 4800, open_year: ee.Date('2009-01-01')}),
    ee.Feature(ee.Geometry.Point(-81.9555, 31.2103), {description: "Fram Archer", yearly_acres: 3264, open_year: ee.Date('2018-01-01')}),
    ee.Feature(ee.Geometry.Point(-82.6795, 31.9227), {description: "Fram Telfair", yearly_acres: 3264, open_year: ee.Date('2012-01-01')}),
    ee.Feature(ee.Geometry.Point(-92.0671, 34.2655), {description: "Highland Pine Bluff", yearly_acres: 18000, open_year: ee.Date('2016-01-01')}),
    ee.Feature(ee.Geometry.Point(-88.2442, 33.0764), {description: "Pinnacle - Aliceville", yearly_acres: 12384, open_year: ee.Date('2011-01-01')}),
    ee.Feature(ee.Geometry.Point(-87.9591, 32.4664), {description: "Alabama Pellets Demopolis", yearly_acres: 10632, open_year: ee.Date('2022-01-01')}),
    ee.Feature(ee.Geometry.Point(-88.7340, 32.0457), {description: "MRE Quitman", yearly_acres: 8640, open_year: ee.Date('2021-01-01')}),
    ee.Feature(ee.Geometry.Point(-85.6264, 35.0713), {description: "MRE Jasper", yearly_acres: 5760, open_year: ee.Date('2017-01-01')}),
    ee.Feature(ee.Geometry.Point(-86.0369, 34.2760), {description: "MRE Crossville", yearly_acres: 2880, open_year: ee.Date('2018-01-01')}),
    ee.Feature(ee.Geometry.Point(-94.4322, 30.7424), {description: "Woodville Pellets", yearly_acres: 12000, open_year: ee.Date('2014-01-01')}),
    ee.Feature(ee.Geometry.Point(-82.3404, 32.5301), {description: "LJR Forest Products", yearly_acres: 5712, open_year: ee.Date('2016-01-01')})
  ];

function addBuffers(features, bufferSize) {
    return features.map(function(feature) {
        return ee.Feature(feature.geometry().buffer(bufferSize));
    });
}

function addBuffer(feature, bufferSize) {
    return feature.geometry().buffer(bufferSize);
}

function countLossByYear(year, region) {
    console.log(region)
    var lossInYear = lossyear.eq(year);
    var areaLostInYear = lossInYear.multiply(ee.Image.pixelArea());
    var totalAreaLost = areaLostInYear.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: 30,  // The scale should match the scale of the dataset.
      maxPixels: 1e9
    });
    return ee.Number(totalAreaLost.get("lossyear")).divide(10000);
  }

  var loss2017 = countLossByYear(21, addBuffer(pelletPlants[0], 80467));
  
  console.log(loss2017)

var bufferedPelletPlants = addBuffers(pelletPlants, 80467);
var bufferedPlantCollection = ee.FeatureCollection(bufferedPelletPlants);

Map.addLayer(bufferedPlantCollection, {}, "Wood Pellet Plants with buffer")

