const https = require('https');
const url = require('url');

class ICAODataLoader {
    static hostname = 'https://applications.icao.int';
    #format;
    #api_key;
    /**
     * 
     * @param {String} api_key 
     * @param {String} format 
     */
    constructor(api_key, format) {
        this.#api_key = api_key;
        this.#format = format;
    }

    weatherConditions(airports, country_code) {
        var url = new URL(ICAODataLoader.hostname);
        url.pathname = '/dataservices/api/current-conditions-list';
        url.searchParams.append('api_key', this.#api_key)
        url.searchParams.append('airports', airports)
        url.searchParams.append('state', country_code)
        url.searchParams.append('format', this.#format);

        https.get(url, res => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
            console.log('No more data in response.');
            });
        })
    }
}

const api_key = '6d441ff3-8ad8-4ee5-9678-5cbbc7933baf';
const format = 'json';
const loader = new ICAODataLoader(api_key, format);

loader.weatherConditions('CYTZ,CYYZ', 'CAN');

module.exports = ICAODataLoader;