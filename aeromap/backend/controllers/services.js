const FlightManager = require('../usecases/FlightManager.js');
const SiteManager = require('../usecases/SiteManager.js');
const { read, write } =  require('../gateways/gateway.js');
const fs = require('fs');

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

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function get_nearest_aerodrome(airports, pin, avoid=[]) {
    let aerodrome;
    let shortest_dist = getDistanceFromLatLonInKm(pin.lat, pin.long, airports[0][4], airports[0][5]);
    for (let i in airports) {
        if (!avoid.includes(airports[i])) {
            const dist = getDistanceFromLatLonInKm(pin.lat, pin.long, airports[i][4], airports[i][5]);
            if (dist < shortest_dist) {
                shortest_dist = dist;
                aerodrome = airports[i];
            }
        }
    }
    return aerodrome;
}

function get_nearby_aerodromes(pins) {
    // use api on pins[0] or ideally geographic center of pins
    let airports = fs.readFileSync('airports.csv').toString().split('\n').slice(1).map(line => line.trim().replaceAll(/\"(.*?)\"/g, m => m.replaceAll(',', 'COMMA')).split(',').map(x => x.replaceAll(/COMMA/g, ',')));
    airports = airports.map(line => line.slice(0, 6));
    const nearest_aerodromes = []
    for (let i = 0; i < 4; i++) {
        aerodrome = get_nearest_aerodrome(airports, pins[0], nearest_aerodromes);
        nearest_aerodromes.push(aerodrome);
    }
    return JSON.stringify(nearest_aerodromes.map(a => {
        return { name: a[3], distance: getDistanceFromLatLonInKm(pins[0].lat, pins[0].long, a[4], a[5]) }
    }));
    // return '[{"name": "cool airport", "distance": "5"}, {"name": "not cool airport", "distance": "1"}]';
}

// get_nearby_aerodromes([{ lat: 43.917833, long: -79.229028 }]);

function get_emergency_contacts(pins) {
    // use api on pins[0] or ideally geographic center of pins
    return '[{"name": "Ronald", "number": "613-828-0011"}, {"name": "Donald", "number": "613-333-4521"}]';
}

function create_site(sitename, pins, margin) {
    siteManager.add_site(sitename, pins, margin, get_airspace(pins), get_nearby_aerodromes(pins), get_emergency_contacts(pins));
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
    
    return '{"temp": "14", "windspeed": "30"}';
}

function create_flight(date, sitename, pilot, drone, notes) {
    flightManager.add_flight(date, sitename, pilot, drone, notes);
}

// // Logs

function get_logs() {
    return JSON.stringify(flightManager.get_past());
}

module.exports = { login, get_flight_schedule, get_airspace, get_nearby_aerodromes, get_emergency_contacts, 
    create_site, get_sites, get_site, get_weather, create_flight, get_logs };