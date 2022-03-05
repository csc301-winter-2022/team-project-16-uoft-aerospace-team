const Preconditions = require("../util/Preconditions");
// TO BE TESTED
/**
 * Represents the geographic coordinates system (latitude and longitude)
 */
 class Coordinates {
    static MEAN_EARTH_RADIUS = 6.317;
    static MIN_LAT = -180.0;
    static MAX_LAT = 180.0;
    static MIN_LON = -90.0;
    static MAX_LON = 90.0;

    /**
     * @param lat
     * @param lon 
     */
    constructor(lat, lon) {
        Preconditions.check(Coordinates.MIN_LON <= lon && lon <= Coordinates.MAX_LON);
        Preconditions.check(Coordinates.MIN_LAT <= lat && lat < Coordinates.MAX_LAT);
        this._lat = lat;
        this._lon = lon;
    }

    get lat() {
        return this._lat;
    }

    get lon() {
        return this._lon;
    }

    /**
     * 
     * @param {Coordinates} other 
     * @returns 
     */
    distanceTo(other) {
        const phi1 = Coordinates.#degToRad(this.lat);
        const phi2 = Coordinates.#degToRad(other.lat);
        const delta_lat = Coordinates.#degToRad(Util.clip(
            this.lat - other.lat, Coordinates.MIN_LAT, Coordinates.MAX_LAT)
        );
        const delta_lon = Coordinates.#degToRad(Util.clip(
            this.lon - other.lon, Coordinates.MIN_LON, Coordinates.MAX_LON
        ));
        
        const a = Util.square(Math.sin(delta_lat / 2)) + 
            Math.cos(phi1) * Math.cos(phi2) * Util.square(Math.sin(delta_lon / 2));
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Coordinates.MEAN_EARTH_RADIUS * c;
    }

    static #degToRad(value) {
        return value * Math.PI / 180;
    }
}

module.exports = Coordinates;