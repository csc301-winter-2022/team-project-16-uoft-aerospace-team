const fs = require('fs');
const path = require('path');
const Angle = require('./geometry/Angle');
const { CircleBuilder, Circle } = require('./geometry/Circle');
const { PolygonBuilder } = require('./geometry/Polygon');
const { Coordinates } = require('./geometry/Coordinates');
const { AirspaceBuilder, AirspaceClass, Airspace } = require('./Airspace');

class AirspaceLoader {

    constructor(filePath, encoding='utf-8') {
        this.filePath = filePath;
        this.encoding = encoding;
    }


    /**
     * 
     * @returns {Promise<Airspace[]>}
     */
    getAllAirspaces() {
        return new Promise((resolve, reject) => {
            try {
                this.getAllAirspacesAsynchronous(resolve);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 
     * @param {Airspace[] => *} callback 
     */
    getAllAirspacesAsynchronous(callback) {
        const airspaces = new Array();
        const polygonBuilder = new PolygonBuilder();
        const circleBuilder = new CircleBuilder();
        const airspaceBuilder = new AirspaceBuilder();
        var uncompleteLine = new String();

        const appendIfReadyToBuild = () => {
            if (polygonBuilder.readyToBuild()) {                                   
                airspaceBuilder.appendShape(polygonBuilder.buildAndReset());
            } 
            if (circleBuilder.readyToBuild()) {
                airspaceBuilder.appendShape(circleBuilder.buildAndReset());
            }
            if (airspaceBuilder.readyToBuild()) {
                airspaces.push(airspaceBuilder.buildAndReset());
            }
        };

        const parseLine = (line) => {
            const acceptedKeys = ['AC', 'AH', 'AL', 'AN', 'DB', 'DC', 'DP', 'V'];
            if (line.length > 0) {
                const splitted = line.split(' ');
                switch(splitted[0]) {
                    case 'AC':                  // This is the first key that appears for an airspace so call build on the appropriate builders
                        appendIfReadyToBuild();
                        airspaceBuilder.airspaceClass = AirspaceClass.parse(splitted[1]);
                        break;
                    case 'AH':
                        airspaceBuilder.highAltitude = this.#parseAltitude(splitted[1]);
                        break;
                    case 'AL':
                        airspaceBuilder.lowAltitude = this.#parseAltitude(splitted[1]);
                        break;
                    case 'AN':
                        airspaceBuilder.name = splitted.slice(1, splitted.length)
                            .join(' ');
                        break;
                    case 'DB':
                        const lat1 = this.parseDMS(splitted[1]);
                        const lon1 = this.parseDMS(splitted[2].slice(0, 
                            splitted[2].length - 1));                                       // Remove the extra ','
                        const firstVertex = Coordinates.ofDeg(lat1, lon1);

                        const lat2 = this.parseDMS(splitted[3]);
                        const lon2 = this.parseDMS(splitted[4]);
                        const secondVertex = Coordinates.ofDeg(lat2, lon2);

                        const circleCenter = circleBuilder.center;                      // Safe call since the center is always the first element of the circle stated in the doc
                        circleBuilder.radius = firstVertex.distanceTo(circleCenter);       // Compute distance and set circle radius
                        circleBuilder.startPoint = firstVertex;
                        circleBuilder.endPoint = secondVertex;

                        const circle = circleBuilder.buildAndReset();                                // Build circle and reset the builder   
                        airspaceBuilder.appendShape(circle);                               // Circle built so we append to the airspace builder
                        polygonBuilder.append(firstVertex);
                        polygonBuilder.append(secondVertex);
                        break;
                    case 'DC':
                        const milesRadius = parseFloat(splitted[1]);
                        circleBuilder.radius = this.#milesToMeters(milesRadius);
                        airspaceBuilder.appendShape(circleBuilder.buildAndReset());
                        break;
                    case 'DP':
                        const lat = this.parseDMS(splitted[1]);
                        const lon = this.parseDMS(splitted[2]);
                        const vertex = Coordinates.ofDeg(lat, lon);
                        polygonBuilder.append(vertex);
                        break;
                    case 'V':
                        if (splitted[1] === 'X=') {
                            const lat = this.parseDMS(splitted[2]);
                            const lon = this.parseDMS(splitted[3]);
                            circleBuilder.center = Coordinates.ofDeg(lat, lon);
                        } else if (splitted[1] === 'D=+') {
                            circleBuilder.rotation = Circle.CLOCKWISE;
                        } else if (splitted[1] === 'D=-') {
                            circleBuilder.rotation = Circle.ANTI_CLOCKWISE;
                        }
                        break;
                    default: 
                        break;
                }
            }
        }

        const stream = fs.createReadStream(this.filePath, this.encoding);

        stream.on('readable', () => {
            stream.read();
        });



        stream.on('data', data => {
            if (data.length > 0) {
                const lines = data.split('\r\n'); // To use with CanAirspace291
                
                // Case to handle: data finishes with \r => the last element of the array has a \r appended...
                // And the next first has \n prepended
            //  data finishes with \r\n => fine, the last element of the array is '' so parse line wont execute
            //  otherwise => the last element is an uncomplete line, to append to the next one
            //if (data.charAt(data.length - 1))

                if (data.charAt(0) === '\n') {
                    const firstLine = lines[0];
                    lines[0] = firstLine.slice(1, firstLine.length); // Remove first character
                } else {
                    lines[0] = uncompleteLine.concat(lines[0]); // Concat with previous chunk
                }

                if (data.charAt(data.length - 1) === '\r') {
                    const lastLine = lines.pop();
                    lines.push(lastLine.slice(0, lastLine.length - 1)); // remove the '\r' at the end
                    // TODO: handle next chunk!!
                } else {
                    uncompleteLine = lines.pop();
                }
                lines.forEach(line => parseLine(line));      
            }
        });

        stream.on('end', () => {
            appendIfReadyToBuild();
            return callback(airspaces);
        });
    }

    #parseAltitude(string) {
        const elevationMatch = string.match(/[0-9]+/);
        const zoneMatch = string.match(/[A-Z]+/);
        const elevation = elevationMatch == null ? 0 : parseInt(elevationMatch[0]);
        const zone = zoneMatch == null ? '' : zoneMatch[0];
        
        const computeFlightLevel = (levelIndicator) => levelIndicator * 100;
        
        switch(zone) {
            case 'SFC': // surface
                return 0;
            case 'MSL':
            case 'AGL':
            case 'AAE':
                return elevation;
            case 'FL':
                return computeFlightLevel(elevation);
            default:
                console.warn("Unhandled elevation zone: " + zone);
                return -1;
        }
    }


    /**
     * 
     * @param {String} dmsLatitude 
     * @returns 
     */
    parseDMS = (dms) => {
        const arr = dms.split(':');
        const degrees = parseFloat(arr[0]);
        const minutes = parseFloat(arr[1]);
        const seconds = parseFloat(arr[2].slice(0, arr[2].length - 1));
        const direction = arr[2].charAt(arr[2].length - 1);
        return Angle.ofDMS(degrees, minutes, seconds, direction).degrees;
    }

    #milesToMeters = (miles) => miles * 1.609344;
}

module.exports = { AirspaceLoader };