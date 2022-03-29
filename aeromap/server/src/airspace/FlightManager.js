const Flight = require("./Flight");

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

    add_flight(date, sitename, pilot, drone, notes) {
        // add ID to flights
        this.flights.push(new Flight(date, sitename, pilot, drone, notes))
    }
    
}

module.exports = FlightManager;