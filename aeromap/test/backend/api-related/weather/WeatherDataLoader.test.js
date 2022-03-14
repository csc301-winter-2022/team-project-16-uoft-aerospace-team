const WeatherDataLoader = require('../../../../src/backend/api-related/weather/WeatherDataLoader');

const loader = WeatherDataLoader.withDefaultAppid({lat: 43.6532,lon: -79.3832});

function hoursToMs(hours) {
    return hours * 60 * 60 * 1000;
}

test('Maximal temperature over hours is correct', async () => {
    const now = Date.now();
    const startDate = new Date(now + hoursToMs(5));
    startDate.setMinutes(0);
    const endDate = new Date(now + hoursToMs(12));
    endDate.setMinutes(0);

    const expected = await loader.getHourlyWeather().then(
        data => {
            var max = -100;
            for (let i = 5; i < 12; i++) {
                max = Math.max(max, data.hourly[i].temp);
            }
            return max;
        }
    );
    return loader.maxTempOverHours({start: startDate, end: endDate}).then(
        temp => expect(temp).toBe(expected)
    );
});