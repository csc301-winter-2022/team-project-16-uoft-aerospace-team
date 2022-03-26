const Polygon = require("./PolygonEntity.js");

function createPolygon(pins) {
    return new Polygon(pins);
}

function getMinMax(polygon) {
    return polygon.getMinMax();
}

module.exports = { createPolygon, getMinMax };