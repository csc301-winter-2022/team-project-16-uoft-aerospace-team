// Message to backend team: import backend files necessary for the following function implementations

import Flight from './Flight/flight'

// Login

const User = require("./User/UserUseCase.js");
// let user = null;

function login(username, password) {
    // check if username and password are correct
    return User.login(username, password);
}

function signup(username, password) {
    // make a new user and then log in
    User.signup(username, password);
    return User.login(username, password);
}

console.log(signup("peter", "dang"));
console.log(login("peter", "dang"));

// // Dashboard

function get_flight_schedule(username) {
    return JSON.stringify();
}

// // Add Site

// function get_airspace(pins) {
//     // pins is a list of coordinates
//     // loop through the pins and choose the most restrictive airspace

//     return 'G';
// }

// function get_nearby_aerodromes(pins) {
//     return JSON.stringify([]);
// }

// // ignore for now
// function get_geofence(pins) {
//     return JSON.stringify([]);
// }

// function create_site(username, name, pins, margin) {
//     // create the site
// }

// // Add Flight

// function get_sites(username) {
//     return JSON.stringify([]);
// }

// function get_site_aerodromes(sitename) {
//     return JSON.stringify([]);
// }

// function get_weather(date, sitename) {
//     return 'cloudy with a chance of balls';
// }

function create_flight(date, sitename, pilot) {
    const flight = new Flight(date, sitename, pilot)
    return JSON.stringify(flight)
}

// console.log(create_flight(new Date(), sitename, User))


// // Logs

// function get_logs() {
//     return JSON.stringify([]);
// }