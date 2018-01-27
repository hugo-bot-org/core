"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wpi_factory_1 = require("./wpi.factory");
class Factory {
    constructor() {
        this.factories = {
            WPIInstance: new wpi_factory_1.WPIFactory().resolve()
        };
    }
    getInstance(instance) {
        const returnInstance = this.factories[instance];
        if (!returnInstance) {
            throw new Error('The factory required does not exists: ' + instance);
        }
        return returnInstance;
    }
}
exports.Factory = Factory;
