const { AirspaceLoader } = require("../Airspace/AirspaceLoader");
const WeatherDataLoader = require("../weather/WeatherDataLoader");
const RequestHandlerInterface = require("./RequestHandlerInterface");

class RequestHandler extends RequestHandlerInterface {

    getWeather(date, location) {
        const loader = WeatherDataLoader.withDefaultAppid(location);
        return loader.maxTempWind(date);
    }

}

module.exports = RequestHandler;