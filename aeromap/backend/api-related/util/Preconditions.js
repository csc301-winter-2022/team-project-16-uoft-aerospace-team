class Preconditions {
    /**
     * Check if the given condition is satisfied
     * @param {boolean} condition 
     */
    static check(condition) {
        if (!condition) {
            throw 'Argument does not meet conditions\n';
        }
    }
}

module.exports = Preconditions;