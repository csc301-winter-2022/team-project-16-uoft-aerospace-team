const ResetableBuilder = require("../util/ResetableBuilder");
const CartesianCoordinates2D = require("./CartesianCoordinates");
const Geographical2DShape = require("./Geographical2DShape");
const { MercatorProjection } = require("./Projection");
const { List } = require('immutable');
/**
 * Represents a geographical 2D polygon
 */
 class Polygon extends Geographical2DShape {
    /**
     * Construct a new Polygon given a list of vertices
     * A polygon should have at least 3 vertices and should
     * always be closed.
     * @param {Coordinates[]} vertices 
     */
    constructor(vertices) {
        super();
        if (vertices.length < 3) {
            throw new Error("Cannot build a polygon with less than 3 vertices");
        }
        // In our representation, the last point is always equal to the first 
        // one
        if (vertices[0] !== vertices[vertices.length - 1]) {
            vertices.push(vertices[0]);                    
        }
        this.vertices = List(vertices);
    }

    /**
     * Determine if the provided location is contained within the boundary
     * of the Geographical polygon. 
     * The algorithm follows the work of 
     * http://www.dcs.gla.ac.uk/~pat/52233/slides/Geometry1x1.pdf
     * 
     * @param {Coordinates} location 
     * @returns 
     */
    contains(location) {
        // Project to be in a 2D cartesian space 
        const cartesianVertices = this.vertices.map(MercatorProjection.project);
        const cartesianLocation = MercatorProjection.project(location);

        // We build an artificial "rightmost" (ie. with highest x value) point
        const verticesMaxX = cartesianVertices.reduce((previous, current) => 
            previous.x > current.x ? previous : current).x; 
        const rightmostPoint = CartesianCoordinates2D.of(verticesMaxX, cartesianLocation.y);
        
        const liesOnOneEdge = cartesianVertices.map(vertex => [vertex, false])
            .reduce((previous, current) => [current[0], previous[1] || 
                cartesianLocation.liesOnEdge(previous[0], current[0])])[1];

        
        /**
         * Two segments [A, B] and [C, D] intersect iff 
         *  1. AB x BC and AB x BD have different signs
         *  AND 2. CD x DA and CD x DB have different signs
         * 
         * In our case, A == p1, B == p2, C == location, D == rightmostPoint
         */
        const horizontalLocationVector = rightmostPoint.substract(cartesianLocation);

        const intersectEdge = (p1, p2) => {
            const edge = p2.substract(p1);
            const cp1 = edge.crossProduct(cartesianLocation.substract(p2));
            const cp2 = edge.crossProduct(rightmostPoint.substract(p2));
            const cp3 = horizontalLocationVector.crossProduct(p1.substract(
                rightmostPoint));
            const cp4 = horizontalLocationVector.crossProduct(p2.substract(
                rightmostPoint));
            return cp1 * cp2 < 0 && cp3 * cp4 < 0
        }

        const nbrIntersections = cartesianVertices.map(vertex => [vertex, 0])
            .reduce((previous, current) => {
                const updatedNbIntersections = intersectEdge(previous[0], current[0]) 
                    ? previous[1] + 1
                    : previous[1];
                return [current[0], updatedNbIntersections];
            })[1];
        
        return liesOnOneEdge || nbrIntersections % 2 != 0; 
    }

    /**
     * 
     * @param {Polygon} other 
     */
    equals(other) {
        return this.vertices.equals(other.vertices);
    }

}

class PolygonBuilder extends ResetableBuilder{
    constructor() {
        super();
        this.vertices = new Array();
    }

    append(vertex) {
        this.vertices.push(vertex);
    }
    build() {
        return new Polygon(this.vertices);
    }

    reset() {
        this.vertices = new Array();
    }

    readyToBuild() {
        const nbVertices = this.vertices.length;
        if (0 < nbVertices && nbVertices <= 2) {
            console.warn('Tried to build a polygon with less than 2 vetices...');
        }
        return this.vertices.length > 2;                // A polygon should always have at least 3 vertices
    }
}

module.exports = { Polygon, PolygonBuilder };