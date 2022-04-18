const AerodromeHelper = require('./AerodromeHelper.js');
const AirspaceHelper = require('./AirspaceHelpers/AirspaceHelper.js')
const DBHelper = require('./DBHelper.js')

class AppController {
    constructor() {
        // this part is gonna retrieve info from database
        this.flightManager = DBHelper.read_flight_manager();
        this.siteManager = DBHelper.read_site_manager();
        this.droneManager = DBHelper.read_drone_manager();
        this.dbHelper = new DBHelper();
        this.aerodromeHelper = new AerodromeHelper();
        this.airspaceHelper = new AirspaceHelper();
    }

    get_flight_schedule() {
        return this.flightManager.get_upcoming();
    }

    get_logs() {
        return this.flightManager.get_past();
    }

    get_flight(fid) {
        return this.flightManager.get_flight(fid);
    }

    get_sites() {
        return this.siteManager.get_sites();
    }

    get_site(sitename) {
        return this.siteManager.get_site(sitename);
    }

    get_airspace(pins) {
        return this.airspaceHelper.get_airspace_class(pins);
    }

    get_nearby_aerodromes(pins) {
        // use api on pins[0] or ideally geographic center of pins
        return this.aerodromeHelper.get_nearby_aerodromes(pins, 4);
    }

    get_count() {
        return this.flightManager.get_flight_count();
    }

    get_emergency_contacts(pins) {
        // use api on pins[0] or ideally geographic center of pins
        return [{ name: "Ronald", number: "613-828-0011" }, { name: "Donald", number: "613-333-4521" }];
    }

    create_site(sitename, pins, margin, polygon) {
        this.siteManager.add_site(sitename, pins, margin, this.get_airspace(pins), this.get_nearby_aerodromes(pins), this.get_emergency_contacts(pins));
        // siteManager.add_site(sitename, pins, margin, get_airspace(pins), [], get_emergency_contacts(pins));
        DBHelper.write_site_manager(this.siteManager);
    }

    get_weather(date, sitename) {
        var location = this.siteManager.get_site_center(sitename);

        // use weather api with location and date

        return { temp: "14", windspeed: "30" };
    }

    create_flight(date, sitename, pilot, drone, notes) {
        this.flightManager.add_flight(date, sitename, pilot, drone, notes);
        DBHelper.write_flight_manager(this.flightManager);
    }

    create_drone(name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance) {
        this.droneManager.add_drone(name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance)
        DBHelper.write_drone_manager(this.droneManager)
    }

    edit_drone(droneid, name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance) {
        let val = this.droneManager.edit_drone(droneid, name, MTOW, type, endurance, range, tempLimits, maxAirspeed, pilots, buildDate, flightCycles, lastMaintenance)
        DBHelper.write_drone_manager(this.droneManager)
        return val
    }

    get_drones() {
        return this.droneManager.get_drones()
    }

    get_drone(droneid) {
        return this.droneManager.get_drone(droneid)
    }
}

module.exports = AppController;