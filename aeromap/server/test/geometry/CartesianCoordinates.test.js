const CartesianCoordinates2D = require("../../src/geometry/CartesianCoordinates");

test('substract() works', () => {
    const a = CartesianCoordinates2D.of(1, 1);
    const b = CartesianCoordinates2D.of(34, 98);
    const res = CartesianCoordinates2D.of(33, 97);
    expect(b.substract(a)).toEqual(res);
});

test('crossProduct() works', () => {
    const v1 = CartesianCoordinates2D.of(2, 2);
    const v2 = CartesianCoordinates2D.of(0, 8);
    const res = 16;
    expect(v1.crossProduct(v2)).toBeCloseTo(res);
    expect(v2.crossProduct(v1)).toBeCloseTo(-res);
});

test('dotProduct() works', () => {
    const v1 = CartesianCoordinates2D.of(2, 2);
    const v2 = CartesianCoordinates2D.of(0, 8);
    const res = 16;
    expect(v1.dotProduct(v2)).toBeCloseTo(res);
});

test('liesOnEdge() handles float precision', () => {
    // Test double precision
    const point = CartesianCoordinates2D.of(-4.0595944770367, 3.9404055229633);
    const a = CartesianCoordinates2D.of(-6, 2);
    const b = CartesianCoordinates2D.of(-3, 5);

    const d = CartesianCoordinates2D.of(-6.2241126191996, 5.714920396268);
    const e = CartesianCoordinates2D.of(-1.7841126191996, 2.074920396268);
    expect(point.liesOnEdge(a, b)).toBeTruthy();
    expect(point.liesOnEdge(d, e)).toBeTruthy();
    expect(point.liesOnEdge(b, a)).toBeTruthy();
    expect(point.liesOnEdge(e, d)).toBeTruthy();
});

test('liesOnEdge() respects segment boundaries', () => {
    const point = CartesianCoordinates2D.of(1, 1);
    const a = CartesianCoordinates2D.of(0, 0);
    const b = CartesianCoordinates2D.of(0.9, 0.9);
    expect(point.liesOnEdge(a, b)).toBeFalsy();
    expect(point.liesOnEdge(b, a)).toBeFalsy();
});

test('liesOnEdge() requires colinearity', () => {
    const point = CartesianCoordinates2D.of(1.1, 1);
    const a = CartesianCoordinates2D.of(0, 0);
    const b = CartesianCoordinates2D.of(2, 2);
    expect(point.liesOnEdge(a, b)).toBeFalsy();
    expect(point.liesOnEdge(b, a)).toBeFalsy();
});