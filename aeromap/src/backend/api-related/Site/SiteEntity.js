class Site {
    constructor(name, polygon, margin) {
        this.name = name;
        this.polygon = polygon;
        this.margin = margin;
    }

    getName() {
        return this.name;
    }

    getPolygon() {
        return this.pins;
    }

    getMargin() {
        return this.margin;
    }

    setName(newName) {
        this.name = newName;
    }

    setPolygon(newPolygon) {
        this.polygon = newPolygon;
    }

    setMargin(newMargin) {
        this.margin = newMargin;
    }
}

module.exports = Site;