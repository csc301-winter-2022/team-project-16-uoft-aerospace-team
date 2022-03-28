const immutable = () => {
    throw new Error('Cannot modify immutable object');
}

const interfaceCheck = () => {
    throw new Error('Interface');
}

const almostEqual = (a, b) => {
    const diff = a - b;
    return -1e-12 < diff && diff < 1e-12;
}

const almostZero = (value) => almostEqual(value, 0);

const randomInt = (min, max) => {
    const range = max - min;
    return Math.floor(Math.random() * range) + min;
};

module.exports = {immutable, interfaceCheck, almostEqual, almostZero, randomInt};