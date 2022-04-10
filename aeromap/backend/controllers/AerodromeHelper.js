const DBHelper = require('./DBHelper');

function deg2rad(deg) {
    return deg * (Math.PI/180)
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

class AerodromeHelper {
    static get_nearest_aerodrome(airports, pin, avoid=[]) {
        console.log(pin);
        let aerodrome;
        let shortest_dist = getDistanceFromLatLonInKm(pin.lat, pin.lng, airports[0][4], airports[0][5]);
        for (let i in airports) {
            if (!avoid.includes(airports[i])) {
                const dist = getDistanceFromLatLonInKm(pin.lat, pin.lng, airports[i][4], airports[i][5]);
                if (dist < shortest_dist) {
                    shortest_dist = dist;
                    aerodrome = airports[i];
                }
            }
        }
        return aerodrome;
    }

    static get_nearby_aerodromes(pins) {
        // use api on pins[0] or ideally geographic center of pins
        let airports = DBHelper.parse_csv("airports.csv");
        let airports_frequencies = DBHelper.parse_csv("airport-frequencies.csv");
        airports = airports.map(line => line.slice(0, 6));
        const nearest_aerodromes = []
        for (let i = 0; i < 4; i++) {
            const aerodrome = AerodromeHelper.get_nearest_aerodrome(airports, pins[0], nearest_aerodromes);
            nearest_aerodromes.push(aerodrome);
        }
        const nearest_frequencies = nearest_aerodromes.map(a => {
            let comm = airports_frequencies.filter(f => f[2] == a[1])
            if (comm.length != 1) {
                return '0';
            } else {
                return comm[0][5]
            }
        })
        return JSON.stringify(nearest_aerodromes.map((a, index) => {
            return { name: a[3], distance: getDistanceFromLatLonInKm(pins[0].lat, pins[0].lng, a[4], a[5]), comm: nearest_frequencies[index] }
        }));
        // return '[{"name": "cool airport", "distance": "5"}, {"name": "not cool airport", "distance": "1"}]';
    }

    // console.log(get_nearby_aerodromes([{ lat: 43.917833, long: -79.229028 }]));
}

module.exports = AerodromeHelper;