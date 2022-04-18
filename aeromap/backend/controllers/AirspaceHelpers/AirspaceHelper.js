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
        this.airspace_centers = AirspaceHelper.get_airspace_centers();
        const airspaceLoader = new AirspaceLoader(path.resolve(__dirname, "../../database/CanAirspace291all.txt"), 'utf-8');
        const loadAirspaces = airspaceLoader.getAllAirspaces().then(airspaces => {
            return airspaces.filter(airspace => 
                airspace.lowAltitude <= 700);
        });
        loadAirspaces.then(airspaces => this.airspaces = List(airspaces).groupBy(airspace => airspace.airspaceClass));
    }

    static get_airspace_centers() {
        const airspaces = DBHelper.parse_txt('CanAirspace291all.txt');

        const center_regex = new RegExp('V X= (.*N .*W)');
        const ac_regex = new RegExp('AC ([A-Z])');
        const point_regex = new RegExp('DP (.*N .*W)');
        const radius_regex = new RegExp('DC (.*)');

        let airspace_centers = airspaces.filter(airspace => {
            for (let line in airspace) {
                if (center_regex.test(airspace[line])) {
                    return true;
                }
            }
            return false;
        }).map(airspace => {
            const airspace_class = {};
            for (let line in airspace) {
                if (ac_regex.test(airspace[line])) {
                    const match = airspace[line].match(ac_regex)
                    airspace_class.ac = match[1];
                }
                if (center_regex.test(airspace[line])) {
                    const match = airspace[line].match(center_regex);
                    airspace_class.center = ParseDMS(match[1]);
                }
                if (radius_regex.test(airspace[line])) {
                    const match = airspace[line].match(radius_regex);
                    airspace_class.radius = parseInt(match[1]) * 1.6;
                }
            }

            if (airspace_class.radius === undefined) {
                for (let line in airspace) {
                    if (point_regex.test(airspace[line])) {
                        const match = airspace[line].match(point_regex);
                        const { lat, lng } = ParseDMS(match[1]);
                        airspace_class.radius = getDistanceFromLatLonInKm(airspace_class.center.lat, airspace_class.center.lng, lat, lng);
                    }
                }
            }
            return airspace_class;
        })
        return airspace_centers;
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
                        console.log(airspace);
                        airspace_classes.push(airspaceClass);           
                    } 
                }
            }
        }
        airspace_classes.push(AirspaceClass.G);
        airspace_classes.sort();
        return airspace_classes[0];
    }
}

module.exports = AirspaceHelper;