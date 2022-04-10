const fs = require("fs");
const path = require("path");
const FlightManager = require('../usecases/FlightManager.js');
const SiteManager = require("../usecases/SiteManager.js");

class DBHelper {

    /**
     * 
     * @param {string} file json database file for a class 
     * @returns {Array} returns JSON array of class objects read from file
     */
     static read(file) {
        const pathName = path.resolve(__dirname, "../database/" + file);
        if (!fs.existsSync(pathName)) {
            fs.writeFileSync(pathName, JSON.stringify({ "data": {} }));
        }
        return (JSON.parse(fs.readFileSync(pathName))).data;
    }
    
    /**
     * 
     * @param {string} file json database file for a class
     * @param {Array} data array of objects to be written to file 
     */
    static write(file, data) {
        fs.writeFileSync(path.resolve(__dirname, "../database/" + file), JSON.stringify({ "data": data }));
    }

    static read_flight_manager() {
        let flightManager;
        const flightData = DBHelper.read('flightManager.json');
        if (Object.keys(flightData).length === 0) {
            flightManager = new FlightManager();
            DBHelper.write_flight_manager(flightManager);
        } else {
            flightManager = new FlightManager(flightData.flightManager.flights);
        }
        return flightManager;
    }
    
    static write_flight_manager(flightManager) {
        DBHelper.write('flightManager.json', { 'flightManager': flightManager });
    }

    static read_site_manager() {
        let siteManager;
        const siteData = DBHelper.read('siteManager.json');
        if (Object.keys(siteData).length === 0) {
            siteManager = new SiteManager();
            DBHelper.write_site_manager(siteManager);
        } else {
            siteManager = new SiteManager(siteData.siteManager.sites);
        }
        return siteManager;
    }

    static write_site_manager(siteManager) {
        DBHelper.write('siteManager.json', { 'siteManager': siteManager });
    }

    static parse_csv(filename) {
        return fs.readFileSync(path.resolve(__dirname, "../database/" + filename)).toString().split('\n').slice(1).map(line => line.trim().replaceAll(/\"(.*?)\"/g, m => m.replaceAll(',', 'COMMA')).split(',').map(x => x.replaceAll(/COMMA/g, ',')));
    }
}

module.exports = DBHelper;