const WeatherDataLoader = require('../../../../src/backend/api-related/weather/WeatherDataLoader');

const loader = WeatherDataLoader.withDefaultAppid({lat: 43.6532,lon: -79.3832});

function hoursToMs(hours) {
    return hours * 60 * 60 * 1000;
}
function daysToMs(days) {
    return days * 24 * 3600 * 1000;
}

test('Maximal temperature over hours is correct', async () => {
    const now = Date.now();
    const startDate = new Date(now + hoursToMs(5));
    startDate.setMinutes(0);
    const endDate = new Date(now + hoursToMs(12));
    endDate.setMinutes(0);

    const expected = await loader.getHourlyWeather().then(
        data => {
            var maxWind = 0;
            var max = -100;
            for (let i = 5; i <= 12; i++) {
                max = Math.max(max, data.hourly[i].temp);
                maxWind = Math.max(maxWind, data.hourly[i].wind_speed);
            }
            return {maxTemp: max, maxWindSpeed: maxWind};
        }
    );
    return loader.maxTempWindOverHours({start: startDate, end: endDate}).then(
        res => {
            expect(res.maxTemp).toBe(expected.maxTemp);
            expect(res.maxWindSpeed).toBe(expected.maxWindSpeed);
        }
    );
});

test('Max temp and wind speed for a date works', async () => {
    // We get the max temp for 4 days from now
    const date = new Date(Date.now() + daysToMs(4));
    const expected = await loader.getDailyWeather().then(data => 
        data.daily[4]).then(day => {
            return {
                temp: day.temp.max,
                wind: day.wind_speed
            };
        });
    
    return loader.maxTempWind(date).then(res => {
        expect(res.maxTemp).toBe(expected.temp);
        expect(res.windSpeed).toBe(expected.wind);
    });
});