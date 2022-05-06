const DBHelper = require('./DBHelper');

function deg2rad(deg) {  // helper
    return deg * (Math.PI/180)
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {  // helper
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
    constructor() {
        this.aerodromes = DBHelper.parse_csv("airports.csv");  //all aerodromes
        this.aerodromes_frequencies = DBHelper.parse_csv("airport-frequencies.csv");  // all frequencies
    }

    get_nearby_aerodromes(pins, num) {
        // use api on pins[0] or ideally geographic center of pins
        const lat = pins[0].lat;
        const lng = pins[0].lng;
        let nearest_aerodromes = [];  // list of aerodromes, their distances, and their comms

        for (let aerodrome of this.aerodromes) {  // get all aerodrome distances from pins[0]
            const distance = getDistanceFromLatLonInKm(lat, lng, aerodrome.latitude_deg, aerodrome.longitude_deg);
            nearest_aerodromes.push({
                aerodrome: aerodrome,
                distance: distance,
            })
        }

        nearest_aerodromes.sort((a, b) => {  // sort them by smallest distance
            if (a.distance < b.distance) {
                return -1;
            } else if (a.distance > b.distance) {
                return 1;
            } else {
                return 0;
            }
        })

        nearest_aerodromes = nearest_aerodromes.slice(0, num);  // get the num nearest aerodromes

        for (let index in nearest_aerodromes) {  // get the num nearest aerodromes' frequencies
            let comm = this.aerodromes_frequencies.filter(frequency => nearest_aerodromes[index].aerodrome.ident === frequency.airport_ident);
            nearest_aerodromes[index].comm = comm.length === 0 ? '0' : comm[0].frequency_mhz;  // if there are no comms then comm is 0
        }

        return nearest_aerodromes.map(nearest => { 
            return { name: nearest.aerodrome.name, distance: nearest.distance, comm: nearest.comm }
        });
    }
}

// const aerodromeHelper = new AerodromeHelper();
// console.log(aerodromeHelper.get_nearby_aerodromes([{ lat: 43.917833, long: -79.229028 }], 4));

module.exports = AerodromeHelper;