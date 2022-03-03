const Flight = require("./FlightEntity.js");

let flights = []


function addFlight(flight) {
    if (flight) {
        flights.append(flight)
        return true;
    }
    else {
        return false;
    }
}