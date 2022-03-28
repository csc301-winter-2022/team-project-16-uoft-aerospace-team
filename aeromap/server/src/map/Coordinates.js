// TO BE TESTED
const Angle = require("../geometry/Angle");
const { immutable } = require("../util/Util");

/**
 * Represents the geographic coordinates system (latitude and longitude)
 * Latitude: South -> North (south pole has latitute 90°S = -90°,
 *   north pole 90°N = 90°, equator is the 0° reference)
 * Longitude: East -> West (Greenwich has longitude 0°, west of Greenwich has
 *  negatitive longitude)
 */ 
 class Coordinates {
    static MEAN_EARTH_RADIUS = 6.317;
    static MIN_LAT_DEG = -180.0;
    static MAX_LAT_DEG = 180.0;
    static MIN_LON_DEG = -90.0;
    static MAX_LON_DEG = 90.0;
    static MIN_LAT_RAD = - Math.PI;
    static MAX_LAT_RAD = Math.PI;
    static MIN_LON_RAD = - Math.PI / 2;
    static MAX_LON_RAD = Math.PI / 2;

    lat;
    lon;
    /**
     * 
     * @param {Number} lat 
     * @param {Number} lon 
     */
    constructor(lat, lon) {
       // Preconditions.check(Coordinates.MIN_LON <= lon && lon <= Coordinates.MAX_LON);
       // Preconditions.check(Coordinates.MIN_LAT <= lat && lat < Coordinates.MAX_LAT);
        this.lat = lat;
        this.lon = lon;
    }

    /**
     * 
     * @param {Number} lat 
     * @param {Number} lon 
     */
    static ofDeg(lat, lon) {
        return new Coordinates(lat, lon);
    }

    static ofRad(lat, lon) {
        return new Coordinates(Angle.radToDeg(lat),
            Angle.radToDeg(lon));
    }

    getLat() {
        return this.lat;
    }

    getLon() {
        return this.lon;
    }
    /**
     * 
     * @param {Coordinates} other 
     * @returns 
     */
    distanceTo(other) {
        const phi1 = Coordinates.#degToRad(this.lat);
        const phi2 = Coordinates.#degToRad(other.getLat());

        const clip = (value, min, max) => {
            const range = max - min;
            if (min <= value && value <= max) {
                return value;
            } else {
                return value < min 
                    ? clip(value + range, min, max)
                    : clip(value - range, min, max);
            }
        }

        const delta_lat = Coordinates.#degToRad(clip(
            this.getLat() - other.getLat(), Coordinates.MIN_LAT_DEG, Coordinates.MAX_LAT_DEG)
        );
        const delta_lon = Coordinates.#degToRad(clip(
            this.getLon() - other.getLon(), Coordinates.MIN_LON_DEG, Coordinates.MAX_LON_DEG
        ));

        const square = (x) => x*x;
        
        const a = square(Math.sin(delta_lat / 2)) + 
            Math.cos(phi1) * Math.cos(phi2) * square(Math.sin(delta_lon / 2));
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Coordinates.MEAN_EARTH_RADIUS * c;
    }

    static #degToRad(value) {
        return value * Math.PI / 180;
    }

    /**
     * 
     * @param {Number} degrees 
     * @param {Number} minutes 
     * @param {Number} seconds 
     * @returns 
     */
    static #DMStoDegree = (degrees, minutes, seconds) => 
        degrees + minutes / 60.0 + seconds / 3600.0;
    
    equals(other) {
        return this.lat === other.getLat() &&
            this.lon === other.getLon();
    }
    

}


module.exports = { Coordinates };