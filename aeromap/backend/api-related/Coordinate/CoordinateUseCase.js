const Coordinates = require("./CoordinateEntity.js");
const DBHelper = require("../Database/DBHelper.js");


function getCoordinates() {
    const CoordinatesString = DBHelper.read("Coordinates.json");
    return CoordinatesString.map((coordinates) => { return new Coordinates(coordinates._lat, coordinates._lon) });
}

function saveCoordinates(coordinates) {
    DBHelper.write("Coordinates.json", coordinates);
}

function createCoordinates(lat, lon) {
    const coordinatesList = getCoordinates();
    const coordinates = findCoordinates(lat, lon);
    if (!coordinates) {
        const newCoordinates = new Coordinates(lat, lon);
        coordinatesList.push(newCoordinates);
        saveCoordinates(coordinatesList)
        return newCoordinates;
    } else {
        return coordinates;
    }
}

function findCoordinates(lat, lon) {
    const coordinatesList = getCoordinates();
    const coordinates = coordinatesList.filter(c => (c._lat === lat && c._lon === lon));
    return coordinates[0];
}

function getNearbyAerodromes(coordinates) {

}


module.exports = { createCoordinates };