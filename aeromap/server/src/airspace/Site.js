class Site {
    constructor(name, pins, margin, airspace_class, nearby_aerodromes, emergency_contacts) {
        this.name = name;
        this.pins = pins;
        this.margin = margin;
        this.airspace_class = airspace_class;
        this.nearby_aerodromes = nearby_aerodromes;
        this.emergency_contacts = emergency_contacts;
    }
}

module.exports = Site;