const Site = require("./SiteEntity.js");
const Polygon = require("../Polygon/PolygonUseCase.js");
const Coordinates = require("../Coordinate/CoordinateUseCase.js");
const DBHelper = require("../Database/DBHelper.js");


function getSites() {
    const sitesString = DBHelper.read("Site.json");
    return sitesString.map((site) => {
        const polygonCoordinates = site.polygon.coordinates.map(c => Coordinates.createCoordinates(c._lat, c._lon));
        const polygon = Polygon.createPolygon(polygonCoordinates); 
        return new Site(site.name, polygon, site.margin); 
    });
}

function saveSites(sites) {
    DBHelper.write("Site.json", sites);
}

function createSite(name, pins, margin) {
    const sites = getSites();
    const polygon = Polygon.createPolygon(pins);
    if (!findSite(name)) {
        const newSite = new Site(name, polygon, margin);
        sites.push(newSite);
        saveSites(sites);
    }
}

function findSite(name) {
    const sites = getSites();
    const site = sites.filter(s => name === s.getName());
    return site[0];
}

function getSiteAerodromes(siteName) {

}

function getWeather(date, siteName) {
    
}

module.exports = { createSite, getSites }