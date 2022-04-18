const Util = require("../util/Util");

class CartesianCoordinates2D {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static of(x, y) {
        return new CartesianCoordinates2D(x, y);
    }

    /**
     * Substraction operation between other and this.
     * this.substract(other) == this - other 
     * == (x1, y1) - (x2, y2) == (x1-x2, y1-y2)
     * @param {CartesianCoordinates2D} other 
     * @returns The resulting Cartesian coordinates
     */
    substract(other) {
        return CartesianCoordinates2D.of(this.x - other.x,
            this.y - other.y);
    }

    /**
     * Compute the cross product of this and the provided 2D cartesian
     * coordinates (other). Note that only the value of the z component
     * (if we consider a 3D space (x,y,z)) is returned as the other
     * 2 components will have value 0.
     * @param {CartesianCoordinates2D} other 
     * @returns the cross product with other
     */
    crossProduct(other) {
        return this.x * other.y - this.y * other.x;
    }

    /**
     * Compute the dot product bewteen this and other
     * @param {CartesianCoordinates2D} other 
     * @returns 
     */
    dotProduct(other) {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Determine if this lies on the segment [edgeStart, edgeEnd]
     * @param {CartesianCoordinates2D} edgeStart 
     * @param {CartesianCoordinates2D} edgeEnd 
     * @returns 
     */
    liesOnEdge(edgeStart, edgeEnd) {
        const edge = edgeEnd.substract(edgeStart);
        const locationVect = this.substract(edgeStart);

        return Util.closeToZero(edge.crossProduct(locationVect), 12) && 
            Math.min(edgeStart.x, edgeEnd.x) <= this.x &&
                this.x <= Math.max(edgeStart.x, edgeEnd.x) &&
                    Math.min(edgeStart.y, edgeEnd.y) <= this.y &&
                        this.y <= Math.max(edgeStart.y, edgeEnd.y);
    }
}

module.exports = CartesianCoordinates2D;