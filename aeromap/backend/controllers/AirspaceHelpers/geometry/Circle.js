const { Coordinates } = require("./Coordinates");
const ResetableBuilder = require("../util/ResetableBuilder");
const Geographical2DShape = require("./Geographical2DShape");
const { MercatorProjection } = require("./Projection");

class Circle extends Geographical2DShape {

    static CLOCKWISE = 1;
    static ANTI_CLOCKWISE = -1;
    /**
     * 
     * @param {Coordinates} center 
     * @param {Number} radius 
     */
    constructor(center, radius, rotation, startPoint, endPoint) {
        super();
       /* Preconditions.check(radius > 0);
        if (startPoint !== null || endPoint !== null) {
            Preconditions.check(endPoint !== null);
            Preconditions.check(startPoint !== null);
            Preconditions.check(almostEqual(center.distanceTo(
                startPoint), radius));
            Preconditions.check(almostEqual(center.distanceTo(
                endPoint), radius));
        }*/
        this.center = center;
        this.radius = radius;
        this.rotation = rotation;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    /**
     * Create an instance of Circle representing a complete 
     * circle 
     * @param {Coordinates} center 
     * @param {Number} radius 
     * @returns 
     */
    static of(center, radius) {
        return new Circle(center, radius, 0, null, null);
    }

    contains(location) {   
        // If complete circle
        if (this.startPoint === null || this.endPoint === null) {
            return this.center.distanceTo(location) <= this.radius;
        } else {
            /** 
             * The given location is enclosed in the described circular shape 
             * if it lies within a radius distance to the shape and is
             * "after" the vector linking the center and the starting point
             * if we follow the direction of the circle and before the vector
             * linking the center and the ending point
             */
            const cartesianStart = MercatorProjection.project(this.startPoint);
            const cartesianEnd = MercatorProjection.project(this.endPoint);
            const boundary = cartesianEnd.substract(cartesianStart);
            const cartesianLoc = MercatorProjection.project(location);

            const crossProd = boundary.crossProduct(cartesianLoc
                .substract(cartesianStart));
            
            return this.center.distanceTo(location) <= this.radius && 
                crossProd * this.rotation >= 0;
        }
    }

    /**
     * 
     * @param {Circle} other 
     * @returns 
     */
    equals(other) {
        return this.center.equals(other.center) && this.radius === other.radius &&
            this.rotation === other.rotation && this.startPoint.equals(other.startPoint)
                && this.endPoint.equals(other.endPoint);
    }

    
}

class CircleBuilder extends ResetableBuilder {
    radius;
    center;
    rotation;
    startPoint;
    endPoint;

    constructor() {
        super();
        this.radius = 0;
        this.center = null;
        this.rotation = 0;
        this.startPoint = null;
        this.endPoint = 0;
    }
    /**
     * @param {Number} value
     */
    set radius(value) {
        this.radius = value;
    }

    /**
     * @param {Coordinates} value
     */
    set center(value) {
        this.center = value;
    }

    /**
     * @param {*} value
     */
    set rotation(value) {
        this.rotation = value;
    }

    /**
     * @param {Coordinates} value
     */
    set startPoint(value) {
        this.startPoint = value;
    }

    /**
     * @param {Coordinates} value
     */
    set endPoint(value) {
        this.endPoint = value;
    }

    build() {
        return new Circle(this.center, this.radius, this.rotation,
             this.startPoint, this.endPoint);
    }

    reset() {
        this.radius = 0;
        this.center = null;
    }


    readyToBuild() {
        return this.radius != 0;
    }

} 

module.exports = { Circle, CircleBuilder };