const FlightManager = require('../usecases/FlightManager');
const SiteManager = require('../usecases/SiteManager');

var FM;
var SM;

// Login

export function login(username, password) {
    // this part is gonna retrieve user info from database if login successful
    // for now, just using blank data
    FM = new FlightManager();
    SM = new SiteManager();
}

// // Dashboard

export function get_flight_schedule() {
    return JSON.stringify(FM.get_upcoming());
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
    return '[{"name": "cool airport", "distance": "5"}, {"name": "not cool airport", "distance": "1"}]';
}

function get_emergency_contacts(pins) {
    // use api on pins[0] or ideally geographic center of pins
    return '[{"name": "Ronald", "number": "613-828-0011"}, {"name": "Donald", "number": "613-333-4521"}]';
}

// ignore for now
function get_geofence(pins) {
    return JSON.stringify([]);
}

function create_site(sitename, pins, margin) {
    SM.add_site(sitename, pins, margin, get_airspace(pins), get_nearby_aerodromes(pins), get_emergency_contacts(pins));
}

// Add Flight

function get_sites(username) {
    return SM.get_sites();
}

function get_site(sitename) {
    return SM.get_site(sitename);
}

function get_weather(date, sitename) {
    var location = SM.get_site_center(sitename);

    // use weather api with location and date
    
    return '{"temp": "14", "windspeed": "30"}';
}

function create_flight(date, sitename, pilot, drone, id, notes) {
    FM.add_flight(date, sitename, pilot, drone, id, notes);
}

// // Logs

export function get_logs() {
    return FM.get_past();
}
