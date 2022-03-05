const Site = require("./SiteEntity.js");
const DBHelper = require("../Database/DBHelper.js");


function getSites() {
    const sitesString = DBHelper.read("Site.json");
    return sitesString.map((site) => { return new Site(site.name, site.pins, site.margin) });
}

function saveSites(sites) {
    DBHelper.write("Site.json", sites);
}

function createSite(name, pins, margin) {
    const sites = getSites();
    if (!findSite(name)) {
        const newSite = new Site(name, pins, margin);
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