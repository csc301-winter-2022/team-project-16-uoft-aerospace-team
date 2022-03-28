const { interfaceCheck } = require("../util/Util");
const WeatherDataLoader = require("../weather/WeatherDataLoader");

class RequestHandlerInterface {

    login(username, password) {
        interfaceCheck();
    }

    getWeather(date, location) {
        interfaceCheck();
    }

    getAirspaceClass(location) {
        interfaceCheck();
    }

    getNearbyAerodromes(location) {
        interfaceCheck();
    }
    
}

module.exports = RequestHandlerInterface;