import { Flight } from './Flight';
import { Coordinates } from '../api-related/Coordinate/CoordinateEntity';
import { Airspace } from '../api-related/Airspace/AirspaceEntity';
//import { Preconditions } from '../api-related/util/Preconditions';
const Preconditions = require('../api-related/util/Preconditions');
class SiteSurvey {
    constructor(props) {
        Preconditions.check(props.flight && props.coordinates
            && props.airspace && props.emergencyContacts); 
        this.#flight = props.flight;
        this.#coordinates = props.coordinates;
        this.#airspace = props.airspace;
        this.#weather = props.weather;
        this.#nearbyAirports = props.nearbyAirports;
        this.#emergencyContacts = props.emergencyContacts;
    }

    static dumbWeather() {
        return 0;
    }
    static dumbNearby() {
        return 0;
    }

    static buildFrom(flight, coordinates, airspace, emergencyContacts) {
        const props = {
            flight: flight,
            coordinates: coordinates,
            airspace: airspace,
            weather: SiteSurvey.dumbWeather(),
            nearbyAirports: SiteSurvey.dumbNearby(),
            emergencyContacts: emergencyContacts
        };
        return new SiteSurvey(props);
    }

    
}