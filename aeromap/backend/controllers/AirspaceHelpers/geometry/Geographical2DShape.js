const { Coordinates } = require("./Coordinates");
const Util = require("../util/Util");


/**
 * Represents a 2D shape at the surface of the globe.
 * Such a shape is defined by a set of geographical coordinates,
 * representing location at the surface of the globe.
 */
 class Geographical2DShape {
    /**
     * Determine if the provided location is enclosed in the shape
     * @param {Coordinates} location 
     */
    contains(location) {
        Util.interfaceCheck();
    }

    /**
     * Define equality between two instances of Geographical2DShape
     * @param {Geographical2DShape} other 
     */
    equals(other) {
        Util.interfaceCheck();
    }
}

module.exports = Geographical2DShape;