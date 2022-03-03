const Site = require("./SiteEntity.js");

let sites = [];

function createSite(name, pins, margin) {
    const newSite = new Site(name, pins, margin);
    sites.push(newSite);
}

function getSites() {
    return sites;
}

function getSiteAerodromes(siteName) {

}

function getWeather(date, siteName) {
    
}