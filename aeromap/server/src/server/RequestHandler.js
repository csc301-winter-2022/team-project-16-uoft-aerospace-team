const { get_nearby_aerodromes } = require("../airspace/AerodromeLoader");
const { AirspaceLoader } = require("../Airspace/AirspaceLoader");
const WeatherDataLoader = require("../weather/WeatherDataLoader");
const RequestHandlerInterface = require("./RequestHandlerInterface");

class RequestHandler extends RequestHandlerInterface {

    getWeather(date, location) {
        const loader = WeatherDataLoader.withDefaultAppid(location);
        return loader.maxTempWind(date);
    }

    getNearbyAerodromes(pins) {
        return get_nearby_aerodromes(pins);
    }

}

module.exports = RequestHandler;