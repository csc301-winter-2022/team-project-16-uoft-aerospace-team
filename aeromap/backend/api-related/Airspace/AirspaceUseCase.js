const Airspace = require("./AirspaceEntity.js");
const Coordinates = require("../Coordinate/CoordinateUseCase.js");
const Polygon = require("../Polygon/PolygonUseCase.js");
const DBHelper = require("../Database/DBHelper.js");


function getAirspaces() {
    const airspacesString = DBHelper.read("Airspace.json");
    return airspacesString.map((airspace) => { 
        const polygonCoordinates = airspace.polygon.coordinates.map(c => Coordinates.createCoordinates(c._lat, c._lon));
        const polygon = Polygon.createPolygon(polygonCoordinates);
        return new Airspace(polygon, airspace.airspaceClass) 
    });
}

function saveAirspaces(airspaces) {
    DBHelper.write("Airspace.json", airspaces);
}

function createAirspace(pins, airspaceClass) {
    const airspaces = getAirspaces();
    const coordinates = pins.map((pin) => { return Coordinates.createCoordinates(pin._lat, pin._lon) })
    const polygon = Polygon.createPolygon(coordinates);
    if (!findAirspace(polygon)) {
        const newAirspace = new Airspace(polygon, airspaceClass);
        airspaces.push(newAirspace);
        saveAirspaces(airspaces);
    }
}

function findAirspace(airspaceClass) {
    const airspaces = getAirspaces();
    const airspace = airspaces.filter(a => airspaceClass === a.getPolygon());
    return airspace[0];
}

function getAirspaceMinMax(airspace) {
    const polygon = airspace.getPolygon();
    return Polygon.getMinMax(polygon);
}

function checkAirspace(coordinate) {
    const airspaces = getAirspaces();
    const airspacesBoundaries = airspaces.map((airspace) => {
        return { boundary: getAirspaceMinMax(airspace), airspaceClass: airspace.getAirspaceClass() };
    });
    const checkedAirspaces = airspacesBoundaries.filter((airspace) => {
        return airspace.boundary.minLat <= coordinate.lat &&
        airspace.boundary.maxLat >= coordinate.lat && 
        airspace.boundary.minLon <= coordinate.lon && 
        airspace.boundary.maxLon >= coordinate.lon;
    });
    return checkedAirspaces[0].airspaceClass;
}


module.exports = { getAirspaces, checkAirspace };