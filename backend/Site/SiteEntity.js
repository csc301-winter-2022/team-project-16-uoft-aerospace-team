class Site {
    constructor(name, pins, margin) {
        this.name = name;
        this.pins = pins;
        this.margin = margin;
    }

    getName() {
        return this.name;
    }

    getPins() {
        return this.pins;
    }

    getMargin() {
        return this.margin;
    }

    setName(newName) {
        this.name = newName;
    }

    setMargin(newMargin) {
        this.margin = newMargin;
    }

    setPins(newPins) {
        this.pins = newPins;
    }
}

module.exports = Site;