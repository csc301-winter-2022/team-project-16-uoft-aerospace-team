const fs = require("fs");
const path = require("path");
const FlightManager = require('../usecases/FlightManager.js');
const SiteManager = require("../usecases/SiteManager.js");
const DroneManager = require("../usecases/DroneManager.js")

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
        if (Object.keys(flightData).length === 0) {  // no data, write blank flightManager
            flightManager = new FlightManager();
            DBHelper.write_flight_manager(flightManager);
        } else {  // has data, construct flight manager from data
            flightManager = new FlightManager(flightData.flightManager.flights);
        }
        return flightManager;
    }
    
    static write_flight_manager(flightManager) {
        DBHelper.write('flightManager.json', { 'flightManager': flightManager });
    }

    static read_site_manager() {  // same format as read_flight_manager()
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

    static read_drone_manager() { // same format as read_flight_manager
        let droneManager;
        const droneData = DBHelper.read('droneManager.json');
        if (Object.keys(droneData).length === 0) {
            droneManager = new DroneManager();
            DBHelper.write_drone_manager(droneManager);
        } else {
            droneManager = new DroneManager(droneData.droneManager.drones);
        }
        return droneManager;
    }

    static write_drone_manager(droneManager) {
        DBHelper.write('droneManager.json', { 'droneManager': droneManager });
    }

    static parse_csv(filename) {
        const lines = fs.readFileSync(path.resolve(__dirname, "../database/" + filename)).toString().split('\n');  // split by line
        const headers = lines[0].split(',').map(header => eval(header));  // get header values
        const return_list = [];  // list of each line in the csv file as an object with header values as keys and line values as values

        const values = lines.slice(1).map(line => line.trim().replaceAll(/\"(.*?)\"/g, m => m.replaceAll(',', 'COMMA')).split(',').map(x => x.replaceAll(/COMMA/g, ',')));  // replace commas in strings with temp var COMMA to split csv line by comma, then replace it back

        for (let line of values) {
            const new_object = {};
            for (let index in line) {
                new_object[headers[index]] = line[index];
            }
            return_list.push(new_object);
        }

        return return_list;
    }
}

module.exports = DBHelper;