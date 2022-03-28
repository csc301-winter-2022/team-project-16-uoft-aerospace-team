const { Coordinates } = require("../map/Coordinates");
const { interfaceCheck } = require("../util/Util");

/**
 * Represents a 2D shape at the surface of the globe
 */
 class Geographical2DShape {
    /**
     * Determine if the provided location is enclosed in the shape
     * @param {Coordinates} location 
     */
    contains(location) {
        interfaceCheck();
    }

    /**
     * Define equality between two instances of Geographical2DShape
     * @param {Geographical2DShape} other 
     */
    equals(other) {
        interfaceCheck();
    }
}

module.exports = Geographical2DShape;