const https = require('https');
const url = require('url');
const Coordinates = require('../Coordinate/CoordinateEntity');
const axios = require('axios');
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
    static #_DAY_IN_SECONDS = 24 * 60 * 60;
    static #_MIN_TEMP = -100;
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

    /**
     * Return a promise of a weather JSON object following from the API call
     * A list of the properties can be found on 
     * https://openweathermap.org/api/one-call-api
     * 
     * Can eventually add a callback before returning
     * 
     * NB: Use new Date(dt) to get a Date from a Unix timestamp.
     * 
     * @returns A Promise "containing" the data (JSON) fetched
     */
    #fetchData() {
        return axios.get(this.#_url.toString())
            .then(response => response.data)
            .catch(error => this.#handleRequestError(error));
    }

    #handleRequestError(error) {
        console.log(error);
    }


    /**
     * Get current weather information 
     * See fetchData for more information.
     * 
     */
    async getCurrentWeather() {
        this.#urlAppend('exclude', 'minutely,hourly,daily,alerts');
        return this.#fetchData();
    }

    /**
     * Get data about daily weather for the next 8 days.
     * See FetchData for more information
     */
    async getDailyWeather() {
        this.#urlAppend('exclude', 'current,minutely,hourly,alerts');
        return this.#fetchData();
    }

    /**
     * Get data about hourly weather for the next 2 days.
     * See FetchData for more information
     */
    getHourlyWeather() {
        this.#urlAppend('exclude', 'current,minutely,daily,alerts');
        return this.#fetchData();
    }


    /**
     * Compute the maximal temperature over a given time window.
     * The temperature is computed given the closest "o'clock" window, 
     * meaning that is the window specified is (January 19, 03:45 ; January 19, 07:38)
     * then the function returns the maximal temperature over the window 
     * [January 19, 04:00 ; January 19, 08:00] where interval limits are inclusive.
     * 
     * This method is meant to be use to know the maximal temperature over a time window
     * that is coming soon in time - day scale - (eg. in the upcoming 2 days).
     * 
     * Some restrcitions applied due to API availability: 
     *  • Only a future time window can be specified 
     *  • The window has to end in the 2 upcoming days (< now + 2days)
     * 
     * Example of usage: 
     *      const timeWindow = {
     *          start: new Date(...),
     *          end: new Date(...)
     *      };
     *      const loader = new WeatherDataLoader(...);
     *      const res = loader.maxTempOverHours(timeWindow)
     *          .then(maxTemp => console.log(maxTemp));
     *            
     * @param {{start: Date, end: Date}} timeWindow 
     * @returns A promise whose return value is the maximal temperature
     */
    maxTempOverHours(timeWindow) {
        const now = Date.now();

        if (timeWindow.end.getTime() - now > 2 * WeatherDataLoader.#_DAY_IN_SECONDS * 1000) {
            throw new Error("API cannot handle such a request");
        } else if (timeWindow.start.getTime() - now < - 1000 * 60) { // Allow for 
            throw new Error('Cannot read weather history');
        } else if (timeWindow.end.getTime() - timeWindow.start.getTime() < 60 * 60 * 1000) {
            throw new Error("Time window should be at least 1 hour long");
        }

        const start = new Date(timeWindow.start);
        // Used to take the closest o'clock hour into account
        start.setMinutes(start.getMinutes() - 30); 
        const end = new Date(timeWindow.end);
        // Used to take the closest o'clock hour into account
        end.setMinutes(end.getMinutes() + 30);
        const dtEnd = end.getTime();
        const dtStart = start.getTime();

        const data = this.getHourlyWeather()
            .then(data => {
                const arr = data.hourly.map(weather => new Object(
                    {
                        dt: weather.dt,
                        temp: weather.temp
                    })
                );
                const filtered = arr.filter(elem => dtStart <= elem.dt * 1000 &&
                    elem.dt * 1000 <= dtEnd);
                return filtered.reduce((previous, weather) => 
                    Math.max(previous, weather.temp), WeatherDataLoader.#_MIN_TEMP);
            });

        return data;
    }

    /**
     * Return the maximal temperature for the given day.
     * 
     * This method is meant to be used for a week scale 
     * - ie. in more than 2 days. For a day scale, use 
     * maxTempOverHours
     * 
     * @param {number} day: distance (in days) to the targeted day. 
     * For example, if we are currently Monday, January 7 and 
     * we want to know the maximal temperature for Tuesday, January 8
     * then we should call maxTempForDay(1)
     */
    maxTempForDay(distance) {
        return this.getDailyWeather().then(data => {
            //console.log(data);
            return data.daily[distance].temp.max}
            );
        }
}

module.exports = WeatherDataLoader;