const FlightManager = require('../usecases/FlightManager.js');
const SiteManager = require('../usecases/SiteManager.js');
const AerodromeHelper = require('./AerodromeHelper.js');
const DBHelper = require('./DBHelper.js')

class AppController {
    constructor() {
        this.flightManager = new FlightManager();
        this.siteManager = new SiteManager();
        this.dbHelper = new DBHelper();
    }
    
    login(username, password) {
        // this part is gonna retrieve user info from database if login successful
        // for now, just using blank data
        
        this.flightManager = DBHelper.read_flight_manager();
        this.siteManager = DBHelper.read_site_manager();
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
        for (let i = 0; i < pins.length; i++) {
            // use api on pins[i]
            // keep track of most restrictive
        }
        return 'G';
    }

    get_nearby_aerodromes(pins) {
        // use api on pins[0] or ideally geographic center of pins
        return AerodromeHelper.get_nearby_aerodromes(pins);
    }

    get_count() {
        return this.flightManager.get_flight_count();
    }

    get_emergency_contacts(pins) {
        // use api on pins[0] or ideally geographic center of pins
        return [{name: "Ronald", number: "613-828-0011"}, {name: "Donald", number: "613-333-4521"}];
    }

    create_site(sitename, pins, margin) {
        this.siteManager.add_site(sitename, pins, margin, this.get_airspace(pins), this.get_nearby_aerodromes(pins), this.get_emergency_contacts(pins));
        // siteManager.add_site(sitename, pins, margin, get_airspace(pins), [], get_emergency_contacts(pins));
        DBHelper.write_site_manager(this.siteManager);
    }
    
    get_weather(date, sitename) {
        var location = this.siteManager.get_site_center(sitename);
    
        // use weather api with location and date
        
        return {temp: "14", windspeed: "30"};
    }

    create_flight(date, sitename, pilot, drone, notes) {
        this.flightManager.add_flight(date, sitename, pilot, drone, notes);
        DBHelper.write_flight_manager(this.flightManager);
    }
}

module.exports = AppController;