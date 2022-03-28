const Util = require("./Util");

class ResetableBuilder {

    build() {
        Util.interfaceCheck();
    }

    reset() {
        Util.interfaceCheck();
    }

    readyToBuild() {
        Util.interfaceCheck();
    }

    buildAndReset() {
        const res = this.build();
        this.reset();
        return res;
    }
}

module.exports = ResetableBuilder;