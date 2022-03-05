const Coordinates = require("./CoordinateEntity.js");
const DBHelper = require("../Database/DBHelper.js");


function getCoordinates() {
    const CoordinatesString = DBHelper.read("Coordinates.json");
    return CoordinatesString.map((coordinates) => { return new Coordinates(coordinates.lat, coordinates.lon) });
}

function saveCoordinates(coordinates) {
    DBHelper.write("Coordinates.json", coordinates);
}

function getAirspace(coordinates) {
    
}

function getNearbyAerodromes(coordinates) {

}

module.exports = { getAirspace, getNearbyAerodromes };