const Flight = require("./Flight.js");
const DBHelper = require("../Database/DBHelper.js")

function getFlights() {
    const flights = DBHelper.read("Flights.json")
    return flights.map((flight) => { return new Flight(flight.date, flight.sitename, flight.pilot) })
}

function saveFlight(flight) {
    DBHelper.write("Flights.json", flight)
}

function createFlight(date, sitename, pilot) {
    const allFlights = getFlights();
    const flight = new Flight(date, sitename, pilot);
    allFlights.push(flight);
    saveFlight(flight)
}

function findFlight(flight) {
    const flights = getFlights();
    const flight = flights.filter(f => id === f.getID());
    return flight[0], flight[4]
}

module.exports = { createFlight, getFlights, findFlight }