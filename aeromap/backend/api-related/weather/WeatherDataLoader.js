const https = require('https');
const url = require('url');
const Coordinates = require('../Coordinate/CoordinateEntity');

/**
 * Used to fetched data from 'https://api.openweathermap.org' API.
 *
 * Example of use:
 * 
 * const loader = new WeatherDataLoader(my_api_key, {lat: 34.3, lon: 67.8});
 * loader.getDailyWeather(json => console.log(json));
 * 
 * The function calls return a JSON object whose properties are detailled at
 * https://openweathermap.org/api/one-call-api
 * 
 */
 class WeatherDataLoader {
    static API_KEY_DEFAULT = 'd73b10b1b7de8a768d8a1dd9e426e5dd';
    #_url;
    /**
     * 
     * @param {string} api_key 
     * @param {Coordinates} coordinates 
     */
    constructor(api_key, coordinates) {
        const hostname = 'https://api.openweathermap.org';
        var url = new URL(hostname);
        url.pathname = '/data/2.5/onecall';
        url.searchParams.append('lat', coordinates.lat.toString());
        url.searchParams.append('lon', coordinates.lon.toString());
        url.searchParams.append('appid', api_key);
        url.searchParams.append('units', 'metric');
        this.#_url = url;
    }

    static withDefaultAppid(coordinates) {
        return new WeatherDataLoader(this.API_KEY_DEFAULT, coordinates);
    }

    #urlAppend(key, value) {
        this.#_url.searchParams.delete(key);
        this.#_url.searchParams.append(key, value);
    }

    #checkCode(code) {
        if (code != 200) {
            throw `Unsuccessful request (code: ${code})`;
        }
    }

    /**
     * Return a JSON object following from the API call
     * A list of the properties can be found on 
     * https://openweathermap.org/api/one-call-api
     * 
     * Can eventually add a callback before returning
     * 
     * NB: Use new Date(dt) to get a Date from a Unix timestamp.
     * 
     * @param {JSON => *} callback: callback to execute on the JSON fetched
     */
    #fetchData(callback) {
        https.get(this.#_url, res => {
            this.#checkCode(res.statusCode);
            res.setEncoding('utf8');

            var data = new String();
            res.on('data', (chunk) => {
                data = data.concat(chunk);
            });
            res.on('end', () => {
                const parsed = JSON.parse(data);
                //console.log(parsed);
                // Decomment if you want to display the JSON in console
                callback(parsed);
            });
        });   
    }


    /**
     * Get current weather information 
     * See fetchData for more information.
     * 
     * @param {JSON => *} callback
     */
    getCurrentWeather(callback) {
        this.#urlAppend('exclude', 'minutely,hourly,daily,alerts');
        this.#fetchData(callback);
    }

    /**
     * Get data about daily weather for the next 8 days.
     * See FetchData for more information
     * @param {JSON => *} callback 
     */
    getDailyWeather(callback) {
        this.#urlAppend('exclude', 'current,minutely,hourly,alerts');
        this.#fetchData(callback);
    }

    /**
     * Get data about hourly weather for the next 2 days.
     * See FetchData for more information
     * @param {JSON => *} callback 
     */
    getHourlyWeather(callback) {
        this.#urlAppend('exclude', 'current,minutely,daily,alerts');
        this.#fetchData(callback);
    }

}

/*const loader = WeatherDataLoader.withDefaultAppid(
    {lat: 43.6532,lon: -79.3832});


loader.getCurrentWeather(x => console.log(x));*/

module.exports = WeatherDataLoader;