const FlightManager = require('../usecases/FlightManager.js');
const SiteManager = require('../usecases/SiteManager.js');
const { read, write } =  require('../gateways/gateway.js');
const aerodrome_helper = require('./aerodrome-helper');

let flightManager = new FlightManager();
let siteManager = new SiteManager();

// Login

function login(username, password) {
    // this part is gonna retrieve user info from database if login successful
    // for now, just using blank data

    const flightData = read('flightManager.json');
    if (Object.keys(flightData).length === 0) {
        flightManager = new FlightManager();
        write('flightManager.json', { 'flightManager': flightManager });
    } else {
        const flights = flightData.flightManager.flights;
        flightManager = new FlightManager(flights);
    }

    const siteData = read('siteManager.json');
    if (Object.keys(siteData).length == 0) {
        siteManager = new SiteManager();
        write('siteManager.json', { 'siteManager': siteManager });
    } else {
        const sites = siteData.siteManager.sites;
        siteManager = new SiteManager(sites);
    }
}

// // Dashboard

function get_flight_schedule() {
    return JSON.stringify(flightManager.get_upcoming());
}

// // Add Site

function get_airspace(pins) {
    for (let i = 0; i < pins.length; i++) {
        // use api on pins[i]
        // keep track of most restrictive
    }
    return 'G';
}

function get_nearby_aerodromes(pins) {
    // use api on pins[0] or ideally geographic center of pins
    return aerodrome_helper.get_nearby_aerodromes(pins);
}

function get_emergency_contacts(pins) {
    // use api on pins[0] or ideally geographic center of pins
    return [{name: "Ronald", number: "613-828-0011"}, {name: "Donald", number: "613-333-4521"}];
}

function create_site(sitename, pins, margin) {
    siteManager.add_site(sitename, pins, margin, get_airspace(pins), get_nearby_aerodromes(pins), get_emergency_contacts(pins));
    write('siteManager.json', { 'siteManager': siteManager });
}

// Add Flight

function get_sites() {
    return siteManager.get_sites();
}

function get_site(sitename) {
    return siteManager.get_site(sitename);
}

function get_weather(date, sitename) {
    var location = siteManager.get_site_center(sitename);

    // use weather api with location and date
    
    return {temp: "14", windspeed: "30"};
}

function create_flight(date, sitename, pilot, drone, notes) {
    flightManager.add_flight(date, sitename, pilot, drone, notes);
    write('flightManager.json', { 'flightManager': flightManager });
}

// // Logs

function get_logs() {
    return JSON.stringify(flightManager.get_past());
}

module.exports = { login, get_flight_schedule, get_airspace, get_nearby_aerodromes, get_emergency_contacts, 
    create_site, get_sites, get_site, get_weather, create_flight, get_logs };