const Site = require("../entities/Site");

class SiteManager {
    constructor() {
        this.sites = []
    }

    get_sites() {
        return this.sites;
    }

    get_site(sitename) {
        for (let i = 0; i < this.sites.length; i++) {
            if (this.sites[i] == sitename) {
                return this.sites[i];
            }
        }
    }

    get_site_center(sitename) {
        var site = this.get_site();
        return site.get_center();
    }

    add_site(name, pins, margin, airspace_class, nearby_aerodromes, emergency_contacts) {
        this.sites.push(new Site(name, pins, margin, airspace_class, nearby_aerodromes, emergency_contacts));
    }

}

module.exports = SiteManager;