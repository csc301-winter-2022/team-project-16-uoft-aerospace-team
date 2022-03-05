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

    add_flight(date, sitename, pilot, drone, id, notes) {
        this.flights.push(new Flight(date, sitename, pilot, drone, id, notes))
    }
    
}

export { FlightManager };