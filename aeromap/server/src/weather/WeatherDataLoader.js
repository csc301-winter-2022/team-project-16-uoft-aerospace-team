const axios = require('axios');
const { Coordinates } = require('../map/Coordinates');
const Preconditions = require('../util/Preconditions');
const url = require('url');
/**
 * Used to fetched data from 'https://api.openweathermap.org' API.
 *
 * Example of use:
 * 
 * const loader = new WeatherDataLoader(my_api_key, {lat: 34.3, lon: 67.8});
 * loader.getDailyWeather().then(data => console.log(data));
 * 
 * The function calls return a JSON object whose properties are detailled at
 * https://openweathermap.org/api/one-call-api
 * 
 */
 class WeatherDataLoader {
    static API_KEY_DEFAULT = 'd73b10b1b7de8a768d8a1dd9e426e5dd';
    static #_DAY_IN_SECONDS = 24 * 60 * 60;
    static #_MIN_TEMP = -100;
    //#_url;
    #_baseUrl;
    /**
     * 
     * @param {string} api_key 
     * @param {Coordinates} coordinates 
     */
    constructor(api_key, coordinates) {
        const hostname = 'https://api.openweathermap.org';
        const url = new URL(hostname);
        url.pathname = '/data/2.5/onecall';
        url.searchParams.append('lat', coordinates.lat.toString());
        url.searchParams.append('lon', coordinates.lon.toString());
        url.searchParams.append('appid', api_key);
        url.searchParams.append('units', 'metric');
        this.#_baseUrl = url;
    }

    static withDefaultAppid(coordinates) {
        return new WeatherDataLoader(this.API_KEY_DEFAULT, coordinates);
    }

    /**
     * Return a promise of a weather JSON object following from the API call
     * A list of the properties can be found on 
     * https://openweathermap.org/api/one-call-api
     * 
     * 
     * NB: Use new Date(dt) to get a Date from a Unix timestamp.
     * @param {URL} url
     * @returns A Promise "containing" the data (JSON) fetched
     */
    #fetchData(url) {
        return axios.get(url.toString())
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
        const url = new URL(this.#_baseUrl);
        url.searchParams.append('exclude', 'minutely,hourly,daily,alerts');
        return this.#fetchData(url);
    }

    /**
     * Get data about daily weather for the next 8 days.
     * See FetchData for more information
     */
    async getDailyWeather() {
        const url = new URL(this.#_baseUrl);
        url.searchParams.append('exclude', 'current,minutely,hourly,alerts');
        return this.#fetchData(url);
    }

    /**
     * Get data about hourly weather for the next 2 days.
     * See FetchData for more information
     */
    getHourlyWeather() {
        const url = new URL(this.#_baseUrl);
        url.searchParams.append('exclude', 'current,minutely,daily,alerts');
        return this.#fetchData(url);
    }

    /**
     * @param {{start: Date, end: Date}} timeWindow 
     * @returns cleaned up start and end time
     */
    #setupTimeWindow(timeWindow) {
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
        const res = {
                dtStart: start.getTime(),
                dtEnd: end.getTime()
            };
        return res;
    }

    /**
     * Compute the maximal temperature and wind speed over a given time window.
     * The result is computed given the closest "o'clock" window, 
     * meaning that is the window specified is (January 19, 03:45 ; January 19, 07:38)
     * then the function returns the maximal temperature/wind speed over the window 
     * [January 19, 04:00 ; January 19, 08:00] where interval limits are inclusive.
     * 
     * This method is meant to be use to know the maximal temperature and wind speed over a time window
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
     *          .then(max => console.log(max.maxTemp + ", " + max.maxWind));
     *            
     * @param {{start: Date, end: Date}} timeWindow 
     * @returns A promise whose return value {maxTemp, maxWindSpeed}
     */
    maxTempWindOverHours(timeWindow) {
        const tmp = this.#setupTimeWindow(timeWindow);
        const dtEnd = tmp.dtEnd;
        const dtStart = tmp.dtStart;

        const data = this.getHourlyWeather()
            .then(data => {
                const arr = data.hourly.map(weather => {
                    const res = {
                        dt: weather.dt,
                        temp: weather.temp,
                        wind: weather.wind_speed
                    }
                    return res;
                }
                );
                const filtered = arr.filter(elem => dtStart <= elem.dt * 1000 &&
                    elem.dt * 1000 <= dtEnd);
                
                const maxTemp = filtered.reduce((previous, weather) => 
                    Math.max(previous, weather.temp), WeatherDataLoader.#_MIN_TEMP);
                const maxWind = filtered.reduce((previous, weather) => 
                    Math.max(previous, weather.wind), 0);
                return {
                    maxTemp: maxTemp,
                    maxWindSpeed: maxWind
                };
            });

        return data;
    }


    #daysToMs(days) {
        return days * WeatherDataLoader.#_DAY_IN_SECONDS * 1000;
    }

    #msToDays(dt) {
        return Math.floor(dt / (WeatherDataLoader.#_DAY_IN_SECONDS * 1000));
    }
    /**
     * Return the maximal temperature and wind speed for the given date
     * Note that the given date has to be included in the upcoming
     * 8 days.
     * No weather history is available (cannot read yesterday's weather
     * for example).
     * @param {Date} date at which we want to know the temperature/ws
     */
    maxTempWind(date) {
        /*const now = Date.now();
        const limit = new Date(Date.now() + this.#daysToMs(2));
        const limit2 = new Date(now + this.#daysToMs(8));
        const diff = date.getTime() - limit.getTime();
        const diff2 = date.getTime() - limit2.getTime();
        if (diff2 > 0) {
            throw new Error("Cannot get weather information for a date that is in more than 8 days");
        } else if (date.getTime() - now < 0) {
            throw new Error("Cannot get weather history (only future time is allowed)");
        } else if (0 < diff && diff2 < 0) { // in this case, the given date exceeds 2 days
            return this.maxTempWindForDay(this.#msToDays(date.getTime() - now));
        } else {
            const startDate = new Date(date);
            startDate.setHours(0);
            return 0;
        }*/

        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        const diff = date.getTime() - today.getTime();
        return this.maxTempWindForDay(this.#msToDays(diff));
    }

    /**
     * Return the maximal temperature and wind speed for the given day.
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
    maxTempWindForDay(distance) {
        Preconditions.check(0 <= distance && distance <= 8);
        return this.getDailyWeather().then(data => {
            return {
                maxTemp: data.daily[distance].temp.max,
                windSpeed: data.daily[distance].wind_speed
            }
        });
    }
}

module.exports = WeatherDataLoader;