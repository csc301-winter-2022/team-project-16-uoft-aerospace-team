import { Site } from "../entities/Site";

class SiteManager {
    constructor() {
        this.sites = []
    }

    get_sites() {
        return this.sites;
    }

    get_site(sitename) {
        return this.sites.find(site => site.name === sitename);
    }

    get_site_center(sitename) {
        let site = this.get_site();
        return site.get_center();
    }

    add_site(name, pins, margin, airspace_class, nearby_aerodromes, emergency_contacts) {
        this.sites.push(new Site(name, pins, margin, airspace_class, nearby_aerodromes, emergency_contacts));
    }

}

export { SiteManager };