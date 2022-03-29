const Util = require("../util/Util");
const WeatherDataLoader = require("../weather/WeatherDataLoader");

class RequestHandlerInterface {

    login(username, password) {
        Util.interfaceCheck();
    }

    getWeather(date, location) {
        Util.interfaceCheck();
    }

    getNearbyAerodromes(location) {
        Util.interfaceCheck();
    }

    login(username, password) {
        Util.interfaceCheck();
    }

    getAirspaceClass(location) {
        Util.interfaceCheck();
    }
    
}

module.exports = RequestHandlerInterface;