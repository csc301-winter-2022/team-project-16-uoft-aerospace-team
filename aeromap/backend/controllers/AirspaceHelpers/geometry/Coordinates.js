// TO BE TESTED
const Angle = require("./Angle");
const Preconditions = require("../util/Preconditions");
const Util = require("../util/Util");

/**
 * Represents the geographic coordinates system (latitude and longitude)
 * Latitude: South -> North (south pole has latitute 90°S = -90°,
 *   north pole 90°N = 90°, equator is the 0° reference)
 * Longitude: East -> West (Greenwich has longitude 0°, west of Greenwich has
 *  negatitive longitude)
 */ 
 class Coordinates {
    static MEAN_EARTH_RADIUS = 6317;
    static MIN_LAT = -90.0;
    static MAX_LAT = 90.0;
    static MIN_LON = -180.0;
    static MAX_LON = 180.0;

    lat;
    lon;
    /**
     * 
     * @param {Number} lat 
     * @param {Number} lon 
     */
    constructor(lat, lon) {
        Preconditions.check(Coordinates.MIN_LON <= lon && lon <= Coordinates.MAX_LON);
        Preconditions.check(Coordinates.MIN_LAT <= lat && lat < Coordinates.MAX_LAT);
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
     * Return the distance (in metres) between this and other
     * @param {Coordinates} other 
     * @returns {Number}
     */
    distanceTo(other) {
        const phi1 = Angle.degToRad(this.lat);
        const phi2 = Angle.degToRad(other.getLat());


        const delta_lat = Angle.degToRad(Util.clip(
            this.getLat() - other.getLat(), Coordinates.MIN_LAT, Coordinates.MAX_LAT)
        );
        const delta_lon = Angle.degToRad(Util.clip(
            this.getLon() - other.getLon(), Coordinates.MIN_LON, Coordinates.MAX_LON
        ));

        const square = (x) => x*x;
        
        const a = square(Math.sin(delta_lat / 2)) + 
            Math.cos(phi1) * Math.cos(phi2) * square(Math.sin(delta_lon / 2));
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Coordinates.MEAN_EARTH_RADIUS * c;
    }


    equals(other) {
        return this.lat === other.getLat() &&
            this.lon === other.getLon();
    }
    

}


module.exports = { Coordinates };