const Site = require("./SiteEntity.js");
const fs = require('fs');
const path = require('path');

function getSites() {
    const pathName = path.resolve(__dirname, "./Site.json");
    if (!fs.existsSync(pathName)) {
        fs.writeFileSync(pathName, JSON.stringify({ "users": [] }));
    } 
    return ((JSON.parse(fs.readFileSync(pathName))).sites).map((site) => { return new Site(site.name, site.pins, site.margin) });
}

function writeSites(sites) {
    fs.writeFileSync(path.resolve(__dirname, "./Site.json"), sites);
}

function createSite(name, pins, margin) {
    const sites = getSites();
    if (!findSite(name)) {
        const newSite = new Site(name, pins, margin);
        sites.push(newSite);
        writeSites(JSON.stringify({ sites }));
    }
}

function findSite(name) {
    const sites = getSites();
    const site = sites.filter(s => s.name === s.getName());
    return site[0];
}

function getSiteAerodromes(siteName) {

}

function getWeather(date, siteName) {
    
}

module.exports = { createSite, getSites }