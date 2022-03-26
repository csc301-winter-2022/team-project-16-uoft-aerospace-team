const Preconditions = require("./Preconditions");

class Util {
    /**
     * 
     * @param {number} value 
     * @returns 
     */
    static square(value) {
        return value * value;
    }
    /**
     * 
     * @param {number} value 
     * @param {number} min 
     * @param {number} max 
     * @returns 
     */
    static clip(value, min, max) {
        Preconditions.check(max > min);
        const range = max - min;
        if (min <= value && value <= max) {
            return value;
        } else {
            return value < min 
                ? this.clip(value + range, min, max)
                : this.clip(value - range, min, max);
        }
    }
}

module.exports = Util;