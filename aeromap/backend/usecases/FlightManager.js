const Flight = require('../entities/Flight.js');
var uuid = require('uuid');

class FlightManager {
    constructor(flights = []) {
        this.flights = flights;
    }

    get_past() {
        // implement by checking time
        return this.flights;
    }

    get_upcoming() {
        // implement by checking time
        return this.flights;
    }

    get_flight_count() {
        return this.flights.length;
    }

    get_flight(fid) {
        return this.flights.find(flight => flight.fid === fid)
    }

    add_flight(date, sitename, pilot, drone, notes) {
        // add ID to flights
        const temp = uuid.v1();
        const fid = temp.slice(0,8)
        this.flights.push(new Flight(fid, date, sitename, pilot, drone, notes))
    }
    
}

module.exports = FlightManager;