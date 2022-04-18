const Util = require("../util/Util");

/**
 * Represents an Angle. The value of the angle is storred both
 * in radians and in degrees.
 */
class Angle {
    degrees;
    radians;
    constructor(degrees, radians) {
        // Degree only
        this.degrees = degrees;
        this.radians = radians;
    }

    /**
     * Create 
     * @param {Number} degrees 
     * @returns 
     */
    static ofDeg(degrees) {
        
        return new Angle(degrees, Angle.degToRad(degrees));
    }

    static ofDMS(degrees, minutes, seconds, direction) {
        const absDeg = degrees + minutes / 60.0 + seconds / 3600.0;
        const signedDeg = direction == 'S' || direction == 'W' 
            ? -absDeg
            : absDeg;
        return new Angle(signedDeg, Angle.degToRad(signedDeg));
    }

    static ofRad(radians) {
        return new Angle(Angle.radToDeg(radians), radians);
    }

    get degrees() {
        return this.degrees;
    }

    get radians() {
        return this.radians;
    }

    set degrees(value) {
        Util.immutable();
    }

    set radians(value) {
        Util.immutable();
    }

    static degToRad = (degrees) => degrees * Math.PI / 180;
    static radToDeg = (radians) => radians * 180 / Math.PI;

}

module.exports = Angle;