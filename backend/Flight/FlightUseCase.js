const Flight = require("./Flight.js");

let flights = []


function create_flight(date, sitename, pilot) {
    const flight = new Flight(date, sitename, pilot)
    flights.push(flight)
}

function getFlights() {
    return flights
}

