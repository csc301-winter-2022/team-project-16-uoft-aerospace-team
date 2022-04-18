const Preconditions = require("./Preconditions");

class Util {
    static immutable = () => {
        throw new Error('Cannot modify immutable object');
    }
    
    static interfaceCheck = () => {
        throw new Error('Interface');
    }
    
    static closeTo = (a, b, digits) => {
        Preconditions.check(digits >= 0);
        const diff = a - b;
        return -Math.pow(10, -digits) < diff && diff < Math.pow(10, -digits);
    }
    
    static closeToZero = (value, digits) => Util.closeTo(value, 0, digits);
    
    static randomInt = (min, max) => {
        const range = max - min;
        return Math.floor(Math.random() * range) + min;
    };
    
    /**
     * Clip a value to the interval defined by [min, max].
     * The boundaries are considered included in the interval.
     * @param {*} value 
     * @param {*} min 
     * @param {*} max 
     * @returns 
     */
    static clip = (value, min, max) => {
        const range = max - min;
        if (min <= value && value <= max) {
            return value;
        } else {
            return value < min 
                ? Util.clip(value + range, min, max)
                : Util.clip(value - range, min, max);
        }
    }
}
module.exports = Util;