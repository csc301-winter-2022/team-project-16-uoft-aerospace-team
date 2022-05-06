const Geographical2DShape = require("./geometry/Geographical2DShape");
const ResetableBuilder = require("./util/ResetableBuilder");
const { List } = require("immutable");
const Preconditions = require("./util/Preconditions");

/**
 * Represents an airspace. An airpsace is essentially a 3-dimensional zone 
 * defined by the following:
 *  - An altitude range: the zone has a low altitude and a high altitude
 *  - A "plane" area (ie. an area that could be drawn at the surface of the
 *      globe)
 *  - An airspace class that summarizes the regulations applied to this airspace
 * 
 * Our implementation is strictly defined with the following features:
 *  - name: an airspace has a unique name
 *  - airspaceClass: class of airspace for this airspace
 *  - shapes: set of geographical shapes (if drawn at the surface of the globe, 
 *      the airspace is defined by the union of the area of the shapes provided)
 *  - lowAltitude: lower bound for the altitude range (in feet)
 *  - highAltitude: higher bound for the altitude range (in feet)
 */
class Airspace {
    static TRANSITION_ALTITUDE = 18000; // Set transition altitude to 18,000 feet. Any airspace 
    static MAX_ALTITUDE = Number.MAX_SAFE_INTEGER; 

    /**
     * @param {String} name 
     * @param {AirspaceClass} airspaceClass
     * @param {Geographical2DShape[]} shapes
     * @param {Number} lowAltitude
     * @param {Number} highAltitude
     */
    constructor(name, airspaceClass, shapes, lowAltitude, highAltitude) {
        Preconditions.checkWithMessage(lowAltitude <= highAltitude, "Altitudes are not correct, low: " + lowAltitude + ', high: ' + highAltitude);
        Preconditions.checkWithMessage(shapes.length > 0, "No shapes");
        this.name = name;
        this.airspaceClass = airspaceClass;
        this.shapes = List(shapes);
        this.lowAltitude = lowAltitude;
        this.highAltitude = highAltitude;
    }

    /**
     * Determine if the provided location is enclosed by the airspace. 
     * 
     * @param {Coordinates} location 
     * @param {Number} altitude
     * @returns 
     */
    contains(location, altitude = 0) {
        const fitsAltitudeRange = this.lowAltitude <= altitude && 
            altitude <= this.highAltitude;
        return this.shapes.reduce((previous, current) => 
            previous || current.contains(location), false);
    }

    /**
     * 
     * @param {Airspace} other 
     */
    equals(other) {
        return !this.name.localeCompare(other.name) && this.airspaceClass 
            === other.airspaceClass && this.shapes.equals(other.shapes) && 
                this.lowAltitude === other.lowAltitude &&
                    this.highAltitude === other.highAltitude;
    }

}

class AirspaceClass {
    static A = new AirspaceClass('A');
    static B = new AirspaceClass('B');
    static C = new AirspaceClass('C');
    static D = new AirspaceClass('D');
    static E = new AirspaceClass('E');
    static F = new AirspaceClass('F');
    static G = new AirspaceClass('G');
    static R = new AirspaceClass('R');          // Appended because appears in the file
    static Q = new AirspaceClass('Q');

    constructor(letter) {
        this.letter = letter;
    }

    static values() {
        return [AirspaceClass.A, AirspaceClass.B, AirspaceClass.C, 
            AirspaceClass.D, AirspaceClass.E, AirspaceClass.F, AirspaceClass.G,
                AirspaceClass.R, AirspaceClass.Q];
    }

    /**
     * 
     * @param {String} letter 
     */
    static parse(letter) {
        //Preconditions.check(letter.length == 1);
        const res = this.values().find(airspaceClass => 
            airspaceClass.letter == letter);
        if (!res) {
            console.warn('No matching class of airspace for letter ' + letter);
            //throw new Error('No matching class of airspace for letter ' + letter);
        } 
        return res;
    }

    compare(other) {
        const values = AirspaceClass.values();
        return values.indexOf(this) - values.indexOf(other);
    }
}

class AirspaceBuilder extends ResetableBuilder {

    constructor() {
        super();
        this.name = '';
        this.airspaceClass = null;
        this.shapes = new Array();
        this.lowAltitude = 0;   // in feet
        this.highAltitude = 0;
    }

    appendShape(shape) {
        this.shapes.push(shape);
    }

    build() {
        return new Airspace(this.name, this.airspaceClass, this.shapes, 
            this.lowAltitude, this.highAltitude);
    }

    reset() {
        this.name = '';
        this.airspaceClass = null;
        this.shapes = new Array();
        this.lowAltitude = 0;
        this.highAltitude = 0;
    }

    readyToBuild() {
        return this.shapes.length > 0 && this.airspaceClass != null && this.highAltitude > 0;
    }
}

module.exports = {Airspace, AirspaceBuilder, AirspaceClass};