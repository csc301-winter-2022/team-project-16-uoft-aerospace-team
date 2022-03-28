const Geographical2DShape = require("../geometry/Geographical2DShape");
const ResetableBuilder = require("../util/ResetableBuilder");
const { List } = require("immutable");

class Airspace {
    static TRANSITION_ALTITUDE = 18000; // Set transition altitude to 18,000 feet. Any airspace 
    static MAX_ALTITUDE = Number.MAX_SAFE_INTEGER; 
    /**
     * 
     * @param {String} name 
     * @param {AirspaceClass} airspaceClass
     * @param {Geographical2DShape[]} shapes
     * @param {Number} lowAltitude
     * @param {Number} highAltitude
     */
    constructor(name, airspaceClass, shapes, lowAltitude, highAltitude) {
        this.name = name;
        this.airspaceClass = airspaceClass;
        this.shapes = List(shapes);
        this.lowAltitude = lowAltitude;
        this.highAltitude = highAltitude;
    }

    /**
     * 
     * @param {Coordinates} location 
     * @returns 
     */
    contains(location) {
        return this.figures.reduce((previous, current) => 
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