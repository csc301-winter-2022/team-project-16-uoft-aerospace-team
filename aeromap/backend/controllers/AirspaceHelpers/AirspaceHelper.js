const DBHelper = require('../DBHelper');
const path = require('path');
const { AirspaceClass } = require('./Airspace');
const { Coordinates } = require('./geometry/Coordinates');
const { AirspaceLoader } = require('./AirspaceLoader');
const { List } = require('immutable');

function ParseDMS(input) {
    let parts = input.split(' ');
    parts = parts.map(c => c.split(':'));
    parts = parts.map(c => {
        const regex = new RegExp('([A-Z])')
        const length = c.length;
        for (let i = 0; i < length; i++) {
            if (regex.test(c[i])) {
                const match = c[i].match(regex);
                c.push(match[1]);
            }
        }
        return c;
    });
    parts = parts.map(c => c.map(n => {
        const value = parseFloat(n);
        if (!isNaN(value)) {
            return value;
        } else {
            return n;
        }
    }))
    const lat = ConvertDMSToDD(parts[0][0], parts[0][1], parts[0][2], parts[0][3]);
    const lng = ConvertDMSToDD(parts[1][0], parts[1][1], parts[1][2], parts[1][3]);
    return { lat: lat, lng: lng};
}

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}

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

class AirspaceHelper {
    constructor() {
        const airspaceLoader = new AirspaceLoader(path.resolve(__dirname, "../../database/CanAirspace291all.txt"), 'utf-8');
        const loadAirspaces = airspaceLoader.getAllAirspaces().then(airspaces => {
            return airspaces.filter(airspace => 
                airspace.lowAltitude <= 700);
        });
        loadAirspaces.then(airspaces => this.airspaces = List(airspaces).groupBy(airspace => airspace.airspaceClass));
    }

    get_airspace_class(pins) {
        const airspace_classes = [];
        for (let pin of pins) {
            const coordinate = new Coordinates(pin.lat, pin.lng);
            for (let i = 0; i < AirspaceClass.values().length; i++) {
                const airspaceClass = AirspaceClass.values()[i];
                const airspaces = this.airspaces.get(airspaceClass, List());
                for (let j = 0; j < airspaces.size; j++) {
                    const airspace = airspaces.get(j);
                    if (airspace.contains(coordinate)) {
                        airspace_classes.push(airspaceClass);           
                    } 
                }
            }
        }
        airspace_classes.push(AirspaceClass.G);
        airspace_classes.sort();
        return airspace_classes[0].letter;
    }
}

module.exports = AirspaceHelper;