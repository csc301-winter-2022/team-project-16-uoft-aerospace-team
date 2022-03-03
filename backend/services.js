// Message to backend team: import backend files necessary for the following function implementations

// Login

let user = null;

function login(username, password) {
    // check if username and password are correct
    user = username;
    return true;
}

function signup(username, password) {
    // make a new user and then
    login(username)
}

// Dashboard

function get_flight_schedule(username) {
    return JSON.stringify([]);
}

// Add Site

function get_airspace(pins) {
    // pins is a list of coordinates
    // loop through the pins and choose the most restrictive airspace

    return 'G';
}

function get_nearby_aerodromes(pins) {
    return JSON.stringify([]);
}

// ignore for now
function get_geofence(pins) {
    return JSON.stringify([]);
}

function create_site(username, name, pins, margin) {
    // create the site
}

// Add Flight

function get_sites(username) {
    return JSON.stringify([]);
}

function get_site_aerodromes(sitename) {
    return JSON.stringify([]);
}

function get_weather(date, sitename) {
    return 'cloudy with a chance of balls';
}

function create_flight(date, sitename, pilot) {
    // make the flight
}

// Logs

function get_logs() {
    return JSON.stringify([]);
}
