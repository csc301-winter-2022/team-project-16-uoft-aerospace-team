class Polygon {
    constructor(coordinates) {
        this.coordinates = coordinates;
    }

    getMinMax() {
        return {
            minLat: Math.min(this.coordinates.map(c => c.lat)),
            maxLat: Math.max(this.coordinates.map(c => c.lat)),
            minLon: Math.min(this.coordinates.map(c => c.lon)),
            maxLon: Math.max(this.coordinates.map(c => c.lon))
        };
    }
}

module.exports = Polygon;