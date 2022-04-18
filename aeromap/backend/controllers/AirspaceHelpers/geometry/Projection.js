const { Coordinates } = require("./Coordinates");
const Angle = require("./Angle");
const CartesianCoordinates2D = require("./CartesianCoordinates");

/**
 * Computed following the fomulas on 
 * https://en.wikipedia.org/wiki/Mercator_projection
 */
 class MercatorProjection {
    /**
     * Project the given coordinates on a 2D cartesian space
     * followgin the Mercator projection
     * @param {Coordinates} coordinates 
     */
    static project(coordinates) {
        const lambda = Angle.degToRad(coordinates.getLon());
        const phi = Angle.degToRad(coordinates.getLat());
        const x = Coordinates.MEAN_EARTH_RADIUS * lambda;
        const y = Coordinates.MEAN_EARTH_RADIUS * Math.log(
                Math.tan(Math.PI / 4 + phi / 2));
        return CartesianCoordinates2D.of(x, y);
    }

    /**
     * Compute the reverse projection (ie. find coordinates (lat, lon))
     * that, when projected, yield the provided cartesian coordinates 
     * @param {*} cartesianCoordinates 
     * @returns 
     */
    static reverse(cartesianCoordinates) {
        const lambda = cartesianCoordinates.x / Coordinates.MEAN_EARTH_RADIUS;
        const phi = 2 * Math.atan(Math.exp(cartesianCoordinates.y / 
            Coordinates.MEAN_EARTH_RADIUS)) - Math.PI / 2;
        return Coordinates.ofRad(phi, lambda);
    }
}

module.exports = { MercatorProjection };