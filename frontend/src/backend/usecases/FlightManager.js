import { Flight } from "../entities/Flight";

class FlightManager {
    constructor() {
        this.flights = []
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

export { FlightManager };