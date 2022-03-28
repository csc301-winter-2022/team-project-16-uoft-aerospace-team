const { randomInt } = require("../../src/util/Util");
const { Set } = require("immutable");
const { Coordinates } = require("../../src/map/Coordinates");
const CartesianCoordinates2D = require("../../src/geometry/CartesianCoordinates");
const { Polygon, PolygonBuilder } = require("../../src/geometry/Polygon");
const { MercatorProjection } = require("../../src/geometry/Projection");

function* randomCoordinates() {
    const a = (Math.random() - 0.5) * 20;
    const b = (Math.random() - 0.5) * 20;
    yield CartesianCoordinates2D.of(a, b);
}

function randomArrayOfCoordinates(size) {
    const arr = new Array(size);
    arr.fill(0, 0, size);
    const containedValues = new Array();

    const onlyNewNumber = (array) => {
        const value = randomCoordinates().next().value;
        if (array.includes(value)) {
            return onlyNewNumber(randomCoordinates().next().value, array);
        } else {
            array.push(value);
            return value;
        }
    }

    return arr.map(value => onlyNewNumber(containedValues));
}

function randomPolygon(size) {
    const array = randomArrayOfCoordinates(size);

    const anchor =  array.reduce((previous, current) => previous.y < current.y 
        ? previous : current);

    const baseVect = CartesianCoordinates2D.of(anchor.x - 1, anchor.y).substract(anchor);
    const a2 = array.filter(vertex => vertex != anchor);   // Remove anchor
  
    const res = a2.sort((v1, v2) => {
        const cp = v1.substract(anchor).crossProduct(v2.substract(anchor));
        return cp;
    });
    const res0 = new Array(anchor).concat(res);
    return new Polygon(res0.map(vertex => MercatorProjection.reverse(vertex)));
}

test('Cannot build a polygon with only 2 vertices', () => {
    expect(() => {
        randomPolygon(2);
    }).toThrow();
}); 

test('A polygon is always closed', () => {

    for (let i = 0; i < 50; i++) {
        const size = randomInt(3, 25);
        const polygon = randomPolygon(size);
        expect(polygon.vertices.size).toBe(size + 1);
        const first = polygon.vertices[0];
        const last = polygon.vertices[size];
        expect(first).toEqual(last);
    }
});

test('contains() work as expected', () => {
    const pb = new PolygonBuilder();
    pb.append(Coordinates.ofDeg(-43.67124, -79.38044));
    pb.append(Coordinates.ofDeg(-43.67212, -79.37219));
    pb.append(Coordinates.ofDeg(-43.66422, -79.36816));
    pb.append(Coordinates.ofDeg(-43.66366, -79.37750));
    const polygon = pb.build();

    const contained = Coordinates.ofDeg(-43.66934, -79.37515);
    const notContained = Coordinates.ofDeg(-43.66406, -79.38711);
    expect(polygon.contains(contained)).toBeTruthy();
    expect(polygon.contains(notContained)).toBeFalsy();

    pb.reset();
    const arr = [
        [-43.64056, -79.33512],
        [-43.64486, -79.33234],
        [-43.64086, -79.32273],
        [-43.62969, -79.33012]
    ];
    arr.forEach(loc => pb.append(Coordinates.ofDeg(loc[0], loc[1])));
    const p2 = pb.build();
    const contained0 = [
        [-43.63824, -79.32876],
        [-43.64320, -79.33232],
    ];
    contained0.forEach(loc => {
        const loc0 = Coordinates.ofDeg(loc[0], loc[1]);
        expect(p2.contains(loc0)).toBeTruthy();
    });

    const notContained0 = [
        [-43.64010, -79.33582],
        [-43.61528, -79.37606]
    ];

    notContained0.forEach(loc => {
        const loc0 = Coordinates.ofDeg(loc[0], loc[1]);
        expect(p2.contains(loc0)).toBeFalsy();
    });
});
