class Airspace {
    constructor(polygon, airspaceClass) {
        this.polygon = polygon;
        this.airspaceClass = airspaceClass;
    }

    getPolygon() {
        return this.polygon;
    }

    getAirspaceClass() {
        return this.airspaceClass;
    }

    setPolygon(newPolygon) {
        this.polygon = newPolygon;
    }

    setAirspaceClass(newClass) {
        this.airspaceClass = newClass;
    }
}

module.exports = Airspace;