const { MercatorProjection } = require("../../src/geometry/Projection");
const { Coordinates } = require("../../src/map/Coordinates");

function* generateLocation() {
    const lat = (Math.random() - 0.5) * 170;
    const lon = (Math.random() - 0.5) * 340;
    yield Coordinates.ofDeg(lat, lon);
}

test('Consistent inverse function', () => {
    const arr = new Array(100);
    arr.fill(0, 0, 100).map(value => generateLocation().next().value)
        .forEach(loc => {
            const proj = MercatorProjection.project(loc);
            const reversed = MercatorProjection.reverse(proj);
            expect(reversed.lat).toBeCloseTo(loc.lat, 4);
            expect(reversed.lon).toBeCloseTo(loc.lon, 4);
        });
}); 