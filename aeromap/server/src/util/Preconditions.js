class Preconditions {
    /**
     * Check if the given condition is satisfied
     * @param {boolean} condition 
     */
    static check(condition) {
        if (!condition) {
            throw new Error('Illegal argument');
        }
    }

    static checkWithMessage(condition, message) {
        if (!condition) {
            throw new Error('Illegal argument (' + message + ')');
        }
    }
}

module.exports = Preconditions;