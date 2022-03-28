class ResetableBuilder {

    build() {
        interfaceCheck();
    }

    reset() {
        interfaceCheck();
    }

    readyToBuild() {
        interfaceCheck();
    }

    buildAndReset() {
        const res = this.build();
        this.reset();
        return res;
    }
}

module.exports = ResetableBuilder;